/**
 * Demo 4: 知识进化 (evolve) — DeepBrain 的核心差异化
 * 
 * 需要 API Key（任选一个）:
 *   export GEMINI_API_KEY=xxx
 *   export OPENAI_API_KEY=sk-xxx
 * 
 * 演示：20 条零散经验 → evolve → 提炼成几条精华知识
 * 
 * 运行: npm run demo:evolve
 */

import { Brain, AgentBrain } from 'deepbrain';

async function main() {
  console.log('🔄 知识进化 Demo\n');
  console.log('━'.repeat(50));
  console.log('');
  console.log('其他框架：记忆越来越多，越来越慢');
  console.log('DeepBrain：知识越来越精，越来越聪明');
  console.log('');

  // 1. Setup
  const provider = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY ? 'gemini'
    : process.env.OPENAI_API_KEY ? 'openai'
    : process.env.DEEPSEEK_API_KEY ? 'deepseek'
    : process.env.DASHSCOPE_API_KEY ? 'dashscope' : '';
  
  if (!provider) {
    console.log('⚠️  需要 API Key: export GEMINI_API_KEY=xxx');
    process.exit(0);
  }

  const brain = new Brain({ 
    embedding_provider: provider,
    db_path: './demo-brain-evolve.db'
  });
  await brain.connect();
  const agent = new AgentBrain(brain, 'evolve-demo');

  // 2. 模拟一周的工作经验
  console.log('📝 模拟一周工作，Agent 积累经验...\n');

  const weekExperiences = [
    // Day 1 - 客户偏好
    { action: '张总来电', result: '张总喜欢下午2点开会', context: { day: 'Mon' } },
    { action: '张总发邮件', result: '张总偏好 PDF 格式的报告', context: { day: 'Mon' } },
    { action: '和张总开会', result: '张总关注 ROI，每次都问投资回报率', context: { day: 'Tue' } },
    { action: '张总反馈', result: '张总说PPT太长了，要简洁版', context: { day: 'Wed' } },
    { action: '给张总做方案', result: '张总喜欢数据驱动的方案，不喜欢空泛描述', context: { day: 'Thu' } },
    
    // Day 2-3 - 产品知识
    { action: '产品培训 X200', result: 'X200 续航 48 小时', context: { day: 'Mon' } },
    { action: '客户问 X200', result: 'X200 售价 2999', context: { day: 'Tue' } },
    { action: 'X200 售后', result: 'X200 保修 2 年，电池保修 1 年', context: { day: 'Tue' } },
    { action: '竞品对比', result: 'X200 比竞品 A 续航多 12 小时', context: { day: 'Wed' } },
    { action: 'X200 评测', result: 'X200 充电速度 0-80% 需 30 分钟', context: { day: 'Thu' } },
    
    // Day 4-5 - 销售流程
    { action: '新客户接待', result: '先了解需求再推产品', context: { day: 'Wed' } },
    { action: '报价审批', result: '超过 5 万需要经理审批', context: { day: 'Wed' } },
    { action: '签约流程', result: '合同模板在 OA 系统，走 3 级审批', context: { day: 'Thu' } },
    { action: '回款周期', result: '标准客户 30 天账期，VIP 45 天', context: { day: 'Thu' } },
    { action: '开票规则', result: '普票即开，专票需 3 个工作日', context: { day: 'Fri' } },
    
    // 更多零散经验...
    { action: '李经理喜好', result: '李经理偏好早上9点开会', context: { day: 'Tue' } },
    { action: '王总需求', result: '王总需要定制化方案', context: { day: 'Wed' } },
    { action: '客户投诉处理', result: '先道歉，再记录，24小时内回复', context: { day: 'Thu' } },
    { action: '月度目标', result: '本月目标 50 万，已完成 35 万', context: { day: 'Fri' } },
    { action: '周会总结', result: '华东区本周新增 8 个潜在客户', context: { day: 'Fri' } },
  ];

  for (const exp of weekExperiences) {
    await agent.learn(exp);
    process.stdout.write('.');
  }
  console.log(`\n\n✅ 一周积累了 ${weekExperiences.length} 条零散经验\n`);

  // 3. Evolve!
  console.log('🔄 开始知识进化 (evolve)...\n');
  console.log('  evolve 会自动：');
  console.log('  · 找到相关的经验');
  console.log('  · 合并重复信息');
  console.log('  · 提炼成精华知识');
  console.log('  · 淘汰过时内容\n');

  const report = await agent.evolve();
  
  console.log('📊 进化报告:');
  console.log(`  · 处理了 ${report.tracesProcessed || 0} 条经验`);
  console.log(`  · 提炼成 ${report.knowledgeCreated || 0} 条知识`);
  console.log(`  · 升级了 ${report.promoted || 0} 条到更高层级`);
  console.log('');

  // 4. 对比
  console.log('━'.repeat(50));
  console.log('');
  console.log('📈 进化前 vs 进化后:');
  console.log('');
  console.log('  进化前：20 条零散记录');
  console.log('  "张总喜欢下午2点开会"');
  console.log('  "张总偏好PDF格式"');
  console.log('  "张总关注ROI"');
  console.log('  "张总说PPT太长了"');
  console.log('  "张总喜欢数据驱动"');
  console.log('  ...');
  console.log('');
  console.log('  进化后：精炼知识');
  console.log('  "张总画像：VIP客户，偏好下午2点开会，');
  console.log('   关注ROI和数据，要求简洁PDF报告"');
  console.log('');
  console.log('  → 5条变1条，但信息量不减');
  console.log('  → 下次见张总前 recall 一次就够了');
  console.log('');
  console.log('━'.repeat(50));
  console.log('🎉 这就是 DeepBrain 的核心差异化：');
  console.log('   知识越来越精，而不是越来越多。');
  console.log('');
  console.log('   别人的 Memory: 存储 + 检索');
  console.log('   DeepBrain:    存储 + 检索 + 提炼 + 进化');
  console.log('');

  await brain.disconnect();
}

main().catch(console.error);
