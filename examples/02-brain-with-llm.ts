/**
 * Demo 2: DeepBrain + LLM 对话（带记忆）
 * 
 * 默认全部使用 Ollama（本地运行，无需 API Key）
 * 需要先安装模型:
 *   ollama pull nomic-embed-text   (embedding)
 *   ollama pull qwen2.5            (chat)
 * 
 * 也支持自定义 LLM:
 *   export LLM_API_KEY=sk-xxx
 *   export LLM_BASE_URL=http://your-api:8235
 *   export LLM_MODEL=minimax_m25
 * 
 * 运行: npm run demo:llm
 */

import { Brain, AgentBrain } from 'deepbrain';
import OpenAI from 'openai';

function detectLLM() {
  if (process.env.LLM_API_KEY) {
    return {
      apiKey: process.env.LLM_API_KEY,
      baseURL: process.env.LLM_BASE_URL || 'http://122.193.22.206:8235',
      model: process.env.LLM_MODEL || 'minimax_m25',
      name: '聚合 API',
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
  // 默认 Ollama
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
  console.log('⚡ DeepBrain + LLM 带记忆对话 Demo\n');
  console.log('━'.repeat(50));

  const llm = detectLLM();
  const embeddingProvider = detectEmbeddingProvider();
  console.log(`\n📦 Embedding: ${embeddingProvider} | Chat: ${llm.name} (${llm.model})\n`);

  if (llm.name === 'Ollama (本地)') {
    console.log('   请确保 Ollama 已启动且模型已拉取:');
    console.log('   ollama pull nomic-embed-text');
    console.log('   ollama pull qwen2.5\n');
  }

  // 1. Brain 初始化
  const brain = new Brain({
    embedding_provider: embeddingProvider,
    db_path: './demo-brain-llm.db'
  });
  await brain.connect();
  const agent = new AgentBrain(brain, 'smart-assistant');

  // 2. 喂知识
  console.log('📝 预加载知识...\n');
  await agent.learn({ action: '公司产品定价', result: '标准版 299/月，专业版 599/月，企业版联系销售' });
  await agent.learn({ action: '技术支持流程', result: '工单系统提交 → 2小时内响应 → 24小时内解决' });
  await agent.learn({ action: '竞品分析', result: '主要竞品 A 产品售价 399/月但功能少30%，B 产品功能类似但无API' });
  console.log('  ✅ 3 条知识已存入\n');

  // 3. 带记忆的对话
  console.log('💬 开始对话（Agent 自动检索记忆 → 注入 LLM）...\n');

  const client = new OpenAI({ apiKey: llm.apiKey, baseURL: llm.baseURL });

  const questions = [
    '客户问我们的定价，怎么回？',
    '客户说竞品 A 更便宜，怎么应对？',
    '客户遇到技术问题了，该怎么处理？',
  ];

  for (const q of questions) {
    console.log(`  👤 客户: "${q}"`);

    // recall: 检索相关记忆
    const memories = await agent.recall(q);
    const context = memories?.map(m => m.text).join('\n') || '';
    console.log(`  🧠 recall → ${memories?.length || 0} 条相关记忆`);

    // LLM: 带记忆上下文调用
    try {
      const response = await client.chat.completions.create({
        model: llm.model,
        messages: [
          { role: 'system', content: `你是一个销售助手，简洁回答。以下是相关知识：\n${context}` },
          { role: 'user', content: q }
        ],
        max_tokens: 200,
      });
      const reply = response.choices[0]?.message?.content || '(无回复)';
      console.log(`  🤖 回复: ${reply.slice(0, 150)}${reply.length > 150 ? '...' : ''}`);
    } catch (e: any) {
      console.log(`  🤖 (LLM 调用失败: ${e.message})`);
    }

    // learn: 存储本次交互
    await agent.learn({ action: `回答客户问题: ${q}`, result: '已用知识库回复', context: { type: 'customer-qa' } });
    console.log('  📌 learn → 已存储本次交互\n');
  }

  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log('流程: recall(检索记忆) → LLM(生成回复) → learn(存储经验)');
  console.log('每次对话都让 Agent 更聪明一点。\n');

  await brain.disconnect();
}

main().catch(console.error);
