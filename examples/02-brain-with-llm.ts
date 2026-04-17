/**
 * Demo 2: DeepBrain + AgentKits (LLM 调用 + 记忆)
 * 
 * Embedding 用 Ollama（本地），Chat 用聚合 API 或任意 OpenAI 兼容服务
 * 
 * 设置聚合服务:
 *   export LLM_API_KEY=sk-xxx
 *   export LLM_BASE_URL=http://your-api:8235
 *   export LLM_MODEL=minimax_m25
 * 
 * 或用 OpenAI / DeepSeek:
 *   export OPENAI_API_KEY=sk-xxx
 *   export DEEPSEEK_API_KEY=sk-xxx
 * 
 * 运行: npm run demo:llm
 */

import { Brain, AgentBrain } from 'deepbrain';
import OpenAI from 'openai';

function detectLLM() {
  // 优先用自定义聚合服务
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
      baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
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
  return null;
}

function detectEmbeddingProvider(): string {
  if (process.env.OPENAI_API_KEY && !process.env.LLM_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return 'gemini';
  return 'ollama'; // 默认本地
}

async function main() {
  console.log('⚡ DeepBrain + AgentKits Demo\n');
  console.log('━'.repeat(50));

  const llm = detectLLM();
  if (!llm) {
    console.log('\n⚠️  需要设置 LLM API Key:\n');
    console.log('   # 方式 1: 聚合服务');
    console.log('   export LLM_API_KEY=sk-xxx');
    console.log('   export LLM_BASE_URL=http://your-api:8235');
    console.log('   export LLM_MODEL=minimax_m25\n');
    console.log('   # 方式 2: OpenAI / DeepSeek');
    console.log('   export OPENAI_API_KEY=sk-xxx');
    console.log('   export DEEPSEEK_API_KEY=sk-xxx\n');
    console.log('没有 LLM？先试: npm run demo:basic');
    process.exit(0);
  }

  const embeddingProvider = detectEmbeddingProvider();
  console.log(`\n📦 Embedding: ${embeddingProvider} | Chat: ${llm.name} (${llm.model})\n`);

  // 1. Brain 初始化（embedding 独立于 chat）
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

  // 3. 带记忆的对话
  console.log('💬 开始对话（Agent 会自动检索记忆）...\n');

  const client = new OpenAI({ apiKey: llm.apiKey, baseURL: llm.baseURL });

  const questions = [
    '客户问我们的定价，怎么回？',
    '客户说竞品 A 更便宜，怎么应对？',
    '客户遇到技术问题了，该怎么处理？',
  ];

  for (const q of questions) {
    console.log(`  👤 客户: "${q}"`);

    // 检索相关记忆
    const memories = await agent.recall(q);
    const context = memories?.map(m => m.text).join('\n') || '';
    console.log(`  🧠 找到 ${memories?.length || 0} 条相关记忆`);

    // 调用 LLM
    try {
      const response = await client.chat.completions.create({
        model: llm.model,
        messages: [
          { role: 'system', content: `你是一个销售助手。以下是相关知识：\n${context}` },
          { role: 'user', content: q }
        ],
        max_tokens: 200,
      });
      const reply = response.choices[0]?.message?.content || '(无回复)';
      console.log(`  🤖 回复: ${reply.slice(0, 150)}${reply.length > 150 ? '...' : ''}`);
    } catch (e: any) {
      console.log(`  🤖 (LLM 调用失败: ${e.message})`);
    }

    // 学习这次交互
    await agent.learn({ action: `回答客户问题: ${q}`, result: '已用知识库回复', context: { type: 'customer-qa' } });
    console.log('  📌 已学习本次交互\n');
  }

  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！');
  console.log('');
  console.log('你体验了:');
  console.log(`  · Embedding (${embeddingProvider}) — 语义检索记忆`);
  console.log(`  · Chat (${llm.name}) — LLM 对话`);
  console.log('  · recall 前自动注入记忆，learn 后自动存储');
  console.log('  → 这就是 "带记忆的 OpenRouter" 的含义');
  console.log('');

  await brain.disconnect();
}

main().catch(console.error);
