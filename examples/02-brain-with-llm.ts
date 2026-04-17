/**
 * Demo 2: DeepBrain + AgentKits (LLM 调用 + 记忆)
 * 
 * 需要 API Key: export OPENAI_API_KEY=sk-xxx 或 DEEPSEEK_API_KEY=sk-xxx
 * 
 * 运行: npm run demo:llm
 */

import { Brain, AgentBrain } from 'deepbrain';

async function main() {
  console.log('⚡ DeepBrain + AgentKits Demo\n');
  console.log('━'.repeat(50));

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.log('⚠️  需要设置 API Key:');
    console.log('   export OPENAI_API_KEY=sk-xxx');
    console.log('   或 export DEEPSEEK_API_KEY=sk-xxx');
    console.log('');
    console.log('没有 API Key？试试无需 Key 的 Demo:');
    console.log('   npm run demo:basic');
    console.log('   npm run demo:evolve');
    process.exit(0);
  }

  const provider = process.env.DEEPSEEK_API_KEY ? 'deepseek' : 'openai';
  const model = provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o-mini';

  // 1. Setup
  console.log(`\n📦 使用 ${provider} / ${model}\n`);
  
  const brain = new Brain({ 
    embedding_provider: provider === 'deepseek' ? 'none' : 'openai',
    db_path: './demo-brain-llm.db'
  });
  await brain.connect();
  const agent = new AgentBrain(brain, 'smart-assistant');

  // 2. 先喂一些知识
  console.log('📝 预加载知识...\n');
  await agent.learn({ action: '公司产品定价', result: '标准版 299/月，专业版 599/月，企业版联系销售' });
  await agent.learn({ action: '技术支持流程', result: '工单系统提交 → 2小时内响应 → 24小时内解决' });
  await agent.learn({ action: '竞品分析', result: '主要竞品 A 产品售价 399/月但功能少30%，B 产品功能类似但无API' });

  // 3. 带记忆的对话
  console.log('💬 开始对话（Agent 会自动检索记忆）...\n');

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

    // 调用 LLM (using dynamic import for agentkits)
    try {
      const { chat } = await import('agentkits');
      const response = await chat({
        provider,
        model,
        messages: [
          { role: 'system', content: `你是一个销售助手。以下是相关知识：\n${context}` },
          { role: 'user', content: q }
        ],
      });
      console.log(`  🤖 回复: ${String(response.content).slice(0, 120)}...`);
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
  console.log('你体验了: LLM 调用前自动 recall 记忆，调用后自动 learn');
  console.log('这就是 "带记忆的 OpenRouter" 的含义');
  console.log('');

  await brain.disconnect();
}

main().catch(console.error);
