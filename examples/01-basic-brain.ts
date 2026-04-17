/**
 * Demo 1: DeepBrain 基础 — learn / recall
 * 
 * 默认使用 Ollama 本地运行，无需 API Key
 * 前置: ollama pull nomic-embed-text
 * 
 * 运行: npm run demo:basic
 */

import { Brain, AgentBrain } from 'deepbrain';

async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch { return false; }
}

async function main() {
  console.log('🧠 DeepBrain 基础 Demo — learn / recall\n');
  console.log('━'.repeat(50));

  // 检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';
  else if (process.env.DEEPSEEK_API_KEY) provider = 'deepseek';
  else if (process.env.DASHSCOPE_API_KEY) provider = 'dashscope';

  // Ollama 健康检查
  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('\n❌ Ollama 未启动！\n');
      console.log('请先安装并启动 Ollama:');
      console.log('  1. 下载: https://ollama.com');
      console.log('  2. 启动 Ollama');
      console.log('  3. 拉取模型: ollama pull nomic-embed-text');
      console.log('  4. 重新运行: npm run demo:basic\n');
      console.log('或者使用云端 provider:');
      console.log('  export OPENAI_API_KEY=sk-xxx');
      console.log('  export GEMINI_API_KEY=xxx\n');
      process.exit(1);
    }
  }

  console.log(`\n📦 Step 1: 初始化 Brain (embedding: ${provider})...`);
  
  let brain: Brain;
  let agent: AgentBrain;
  try {
    brain = new Brain({ 
      embedding_provider: provider,
      db_path: './demo-brain.db'
    });
    await brain.connect();
    agent = new AgentBrain(brain, 'demo-sales-agent');
    console.log('✅ Brain 初始化完成\n');
  } catch (e: any) {
    console.error(`\n❌ Brain 初始化失败: ${e.message}`);
    if (provider === 'ollama') {
      console.log('\n请确认:');
      console.log('  1. Ollama 已启动 (ollama serve)');
      console.log('  2. 已拉取模型: ollama pull nomic-embed-text\n');
    }
    process.exit(1);
  }

  // 2. 学习
  console.log('📝 Step 2: Agent 开始学习...\n');
  
  const experiences = [
    { action: '接待了 VIP 客户张总', result: '张总偏好下午开会，喜欢简洁的 PPT', context: { customer: '张总', level: 'VIP' } },
    { action: '处理了退货投诉', result: '7天无理由退货需保留原包装，超过7天走售后流程', context: { type: 'complaint' } },
    { action: '完成了 Q1 销售报告', result: '华东区增长 23%，华南区下降 5%，主因是竞品降价', context: { quarter: 'Q1' } },
    { action: '参加了产品培训', result: '新品 X200 主打续航 48 小时，售价 2999，4月15日上市', context: { product: 'X200' } },
    { action: '又见了张总', result: '张总对 X200 很感兴趣，让准备报价方案', context: { customer: '张总', product: 'X200' } },
  ];

  for (const exp of experiences) {
    try {
      await agent.learn(exp);
      console.log(`  📌 学到: ${exp.action}`);
    } catch (e: any) {
      console.error(`  ❌ 学习失败: ${e.message}`);
    }
  }
  console.log(`\n✅ Agent 学习了 ${experiences.length} 条经验\n`);

  // 3. 回忆
  console.log('🔍 Step 3: 测试记忆检索...\n');

  const queries = [
    '张总的偏好是什么？',
    '退货政策是怎样的？',
    'X200 产品信息',
    '华东区销售情况',
  ];

  for (const q of queries) {
    console.log(`  ❓ 问: "${q}"`);
    try {
      const memories = await agent.recall(q);
      if (memories && memories.length > 0) {
        const text = memories[0].text || JSON.stringify(memories[0]);
        console.log(`  💡 答: ${text.slice(0, 80)}${text.length > 80 ? '...' : ''}`);
        if (memories[0].score !== undefined) {
          console.log(`  📊 相关度: ${(memories[0].score * 100).toFixed(0)}%`);
        }
      } else {
        console.log(`  💡 (未找到相关记忆)`);
      }
    } catch (e: any) {
      console.error(`  ❌ 检索失败: ${e.message}`);
    }
    console.log('');
  }

  // 4. 总结
  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log('你刚刚体验了 DeepBrain 的核心功能:');
  console.log('  · learn()  — 存储经验');
  console.log('  · recall() — 语义检索\n');
  console.log('下一步: npm run demo:llm (带记忆的 LLM 对话)\n');

  await brain!.disconnect();
}

main().catch(e => {
  console.error(`\n💥 未预期错误: ${e.message}\n`);
  process.exit(1);
});
