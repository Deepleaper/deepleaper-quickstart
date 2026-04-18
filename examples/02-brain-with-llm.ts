/**
 * Demo 02: DeepBrain + LLM 带记忆对话
 *
 * 完整链路: recall(检索记忆) → LLM(生成回复) → learn(存储经验)
 * 默认用 Ollama 本地运行，无需 API Key
 * 前置: ollama pull nomic-embed-text && ollama pull qwen2.5
 *
 * 也支持云端 LLM:
 *   export LLM_API_KEY=sk-xxx LLM_BASE_URL=http://... LLM_MODEL=xxx
 *
 * 运行: npm run demo:llm
 */

import { Brain, AgentBrain } from 'deepbrain';
import OpenAI from 'openai';

async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch {
    return false;
  }
}

function detectLLM() {
  if (process.env.LLM_API_KEY) {
    return {
      apiKey: process.env.LLM_API_KEY,
      baseURL: process.env.LLM_BASE_URL || 'http://localhost:8235',
      model: process.env.LLM_MODEL || 'gpt-4o-mini',
      name: '自定义 API',
    };
  }
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
      model: 'deepseek-chat',
      name: 'DeepSeek',
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: 'gpt-4o-mini',
      name: 'OpenAI',
    };
  }
  return {
    apiKey: 'ollama',
    baseURL: 'http://localhost:11434/v1',
    model: 'qwen2.5',
    name: 'Ollama (本地)',
  };
}

function detectEmbeddingProvider(): string {
  if (process.env.OPENAI_API_KEY && !process.env.LLM_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return 'gemini';
  return 'ollama';
}

async function main() {
  console.log('\n=== Demo 02: DeepBrain + LLM 带记忆对话 ===\n');
  console.log('='.repeat(50));

  const llm = detectLLM();
  const embeddingProvider = detectEmbeddingProvider();

  // Ollama 健康检查
  if (llm.name === 'Ollama (本地)' || embeddingProvider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('\n[ERROR] Ollama 未启动!');
      console.log('  Ollama not running? Run: ollama serve');
      console.log('  然后拉取模型:');
      console.log('    ollama pull nomic-embed-text');
      console.log('    ollama pull qwen2.5\n');
      process.exit(1);
    }
  }

  console.log(`\n>> Embedding: ${embeddingProvider} | Chat: ${llm.name} (${llm.model})\n`);

  // 1. Brain 初始化
  let brain: Brain;
  let agent: AgentBrain;
  try {
    brain = new Brain({
      embedding_provider: embeddingProvider,
      db_path: './demo-brain-llm.db',
    });
    await brain.connect();
    agent = new AgentBrain(brain, 'smart-assistant');
    console.log('[OK] Brain 初始化成功\n');
  } catch (e: any) {
    console.error(`[ERROR] Brain 初始化失败: ${e.message}`);
    process.exit(1);
  }

  // 2. 预置知识
  console.log('>> 加载知识库...\n');
  const knowledge = [
    { action: '记录了产品价格', result: '基础版 299/月,专业版 599/月,企业版需要单独报价' },
    { action: '记录了退款政策', result: '购买后7天内无理由退款  2周内有条件退款  24小时客服支持' },
    { action: '记录了对比信息', result: '竞品对比 A 方案便宜但功能少 399/月可打折30%,B 方案功能全但没有API' },
  ];
  for (const k of knowledge) {
    await agent.learn(k);
    console.log(`  [loaded] ${k.action}`);
  }
  console.log('');

  // 3. 模拟多轮对话
  console.log('>> 开始对话(recall → LLM → learn)...\n');

  const client = new OpenAI({ apiKey: llm.apiKey, baseURL: llm.baseURL });

  const questions = [
    '你们产品多少钱,给我介绍下',
    '和竞品 A 比怎么样,值不值得买',
    '如果我买了不满意,能退款吗',
  ];

  for (const q of questions) {
    console.log(`  [user] "${q}"`);

    // recall: 检索相关记忆
    let context = '';
    try {
      const memories = await agent.recall(q);
      context = memories?.map((m) => m.text).join('\n') || '';
      console.log(`  [recall] 找到 ${memories?.length || 0} 条相关记忆`);
    } catch (e: any) {
      console.log(`  [recall] 检索失败: ${e.message}`);
    }

    // LLM: 生成回复
    try {
      const response = await client.chat.completions.create({
        model: llm.model,
        messages: [
          { role: 'system', content: `你是智能客服,用简洁友好的语言回答(50字以内),参考知识:\n${context}` },
          { role: 'user', content: q },
        ],
        max_tokens: 200,
      });
      const reply = response.choices[0]?.message?.content || '(无回复)';
      console.log(`  [reply] ${reply.slice(0, 150)}${reply.length > 150 ? '...' : ''}`);
    } catch (e: any) {
      console.log(`  [reply] LLM 调用失败: ${e.message}`);
      if (llm.name === 'Ollama (本地)') {
        console.log('         Ollama not responding? Run: ollama serve');
        console.log('         Model missing? Run: ollama pull qwen2.5');
      }
    }

    // learn: 存储对话经验
    try {
      await agent.learn({ action: `回答了问题: ${q}`, result: '已处理', context: { type: 'qa' } });
      console.log('  [learn] 经验已存储\n');
    } catch (e: any) {
      console.log(`  [learn] 存储失败: ${e.message}\n`);
    }
  }

  console.log('='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('流程: recall(检索记忆) → LLM(生成回复) → learn(存储经验)');
  console.log('这就是 Agent 越用越聪明的核心循环\n');
  console.log('下一步: npm run demo:agent (完整 Agent 展示)\n');

  await brain!.disconnect();
}

main().catch((e) => {
  console.error(`\n[FATAL] 运行失败: ${e.message}\n`);
  process.exit(1);
});
