/**
 * Demo 01: DeepBrain 基础 — learn / recall
 *
 * 默认用 Ollama 本地运行，无需 API Key
 * 前置: ollama pull nomic-embed-text
 *
 * 运行: npm run demo:basic
 */

import { Brain, AgentBrain } from 'deepbrain';

async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  console.log('\n=== Demo 01: DeepBrain 基础 — learn / recall ===\n');
  console.log('='.repeat(50));

  // 自动检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';
  else if (process.env.DEEPSEEK_API_KEY) provider = 'deepseek';
  else if (process.env.DASHSCOPE_API_KEY) provider = 'dashscope';

  // Ollama 健康检查
  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('\n[ERROR] Ollama 未启动!\n');
      console.log('请先安装并启动 Ollama:');
      console.log('  1. 下载: https://ollama.com');
      console.log('  2. 启动 Ollama');
      console.log('  3. 拉取模型: ollama pull nomic-embed-text');
      console.log('  4. 重新运行: npm run demo:basic\n');
      console.log('或者使用云端 provider:');
      console.log('  export OPENAI_API_KEY=sk-xxx\n');
      process.exit(1);
    }
  }

  // Step 1: 初始化 Brain
  console.log(`\n>> Step 1: 初始化 Brain (embedding: ${provider})...`);

  let brain: Brain;
  let agent: AgentBrain;
  try {
    brain = new Brain({
      embedding_provider: provider,
      db_path: './demo-brain.db',
    });
    await brain.connect();
    agent = new AgentBrain(brain, 'demo-sales-agent');
    console.log('[OK] Brain 初始化成功\n');
  } catch (e: any) {
    console.error(`\n[ERROR] Brain 初始化失败: ${e.message}`);
    if (provider === 'ollama') {
      console.log('\n排查步骤:');
      console.log('  1. Ollama 是否运行? (ollama serve)');
      console.log('  2. 模型是否已拉取? ollama pull nomic-embed-text\n');
    }
    process.exit(1);
  }

  // Step 2: 学习经验
  console.log('>> Step 2: Agent 学习销售经验...\n');

  const experiences = [
    { action: '接待了 VIP 客户王总', result: '对高端产品很感兴趣,约好下周看 PPT', context: { customer: '王总', level: 'VIP' } },
    { action: '处理了客户投诉', result: '7天无理由退换已处理,客户表示7天内会再看', context: { type: 'complaint' } },
    { action: '完成了 Q1 销售报告', result: '总销售额增长 23%,新客户增长 5%,建议加大投放', context: { quarter: 'Q1' } },
    { action: '录入了新产品信息', result: '产品 X200 续航达 48 小时,售价 2999,4月15日正式发布', context: { product: 'X200' } },
    { action: '跟进了老客户', result: '李总对 X200 很感兴趣,准备下单试用装', context: { customer: '李总', product: 'X200' } },
  ];

  for (const exp of experiences) {
    try {
      await agent.learn(exp);
      console.log(`  [learned] ${exp.action}`);
    } catch (e: any) {
      console.error(`  [error] 学习失败: ${e.message}`);
    }
  }
  console.log(`\n[OK] Agent 学习了 ${experiences.length} 条经验\n`);

  // Step 3: 语义检索
  console.log('>> Step 3: 语义检索测试...\n');

  const queries = ['有什么客户投诉', '最新的销售数据', 'X200 什么时候发布', '有没有新产品'];

  for (const q of queries) {
    console.log(`  [query] "${q}"`);
    try {
      const memories = await agent.recall(q);
      if (memories && memories.length > 0) {
        const text = memories[0].text || JSON.stringify(memories[0]);
        console.log(`  [found] ${text.slice(0, 80)}${text.length > 80 ? '...' : ''}`);
        if (memories[0].score !== undefined) {
          console.log(`  [score] 匹配度: ${(memories[0].score * 100).toFixed(0)}%`);
        }
      } else {
        console.log('  [empty] (未找到相关记忆)');
      }
    } catch (e: any) {
      console.error(`  [error] 检索失败: ${e.message}`);
    }
    console.log('');
  }

  // 总结
  console.log('='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('你已经学会了 DeepBrain 的核心能力:');
  console.log('  - learn()  → 学习经验');
  console.log('  - recall() → 语义检索\n');
  console.log('下一步: npm run demo:llm (结合 LLM 对话)\n');

  await brain!.disconnect();
}

main().catch((e) => {
  console.error(`\n[FATAL] 运行失败: ${e.message}\n`);
  process.exit(1);
});
