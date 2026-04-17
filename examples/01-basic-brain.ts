/**
 * Demo 1: DeepBrain 基础用法
 * 
 * 无需 API Key！使用本地存储体验 Agent 记忆的核心功能。
 * 
 * 运行: npm run demo:basic
 */

import { Brain, AgentBrain } from 'deepbrain';

async function main() {
  console.log('🧠 DeepBrain 基础 Demo\n');
  console.log('━'.repeat(50));

  // 1. 初始化
  console.log('\n📦 Step 1: 初始化 Brain...');
  const brain = new Brain({ 
    embedding_provider: 'none',  // 本地模式，无需 API Key
    db_path: './demo-brain.db'
  });
  await brain.connect();
  const agent = new AgentBrain(brain, 'demo-sales-agent');
  console.log('✅ Brain 初始化完成\n');

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
    await agent.learn(exp);
    console.log(`  📌 学到: ${exp.action}`);
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
    const memories = await agent.recall(q);
    if (memories && memories.length > 0) {
      console.log(`  💡 答: ${memories[0].text?.slice(0, 80)}...`);
      console.log(`  📊 相关度: ${(memories[0].score * 100).toFixed(0)}%\n`);
    } else {
      console.log(`  💡 (未找到相关记忆)\n`);
    }
  }

  // 4. 总结
  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！');
  console.log('');
  console.log('你刚刚体验了 DeepBrain 的核心功能：');
  console.log('  · learn()  — 存储经验');
  console.log('  · recall() — 语义检索');
  console.log('');
  console.log('下一步试试: npm run demo:evolve (知识进化)');
  console.log('');

  await brain.disconnect();
}

main().catch(console.error);
