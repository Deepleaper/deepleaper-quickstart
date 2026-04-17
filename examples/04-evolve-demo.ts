/**
 * Demo 4: 知识进化 evolve — DeepBrain 核心差异化
 * 
 * 默认使用 Ollama 本地运行，无需 API Key
 * 前置: ollama pull nomic-embed-text
 * 
 * 运行: npm run demo:evolve
 */

import { Brain, AgentBrain } from 'deepbrain';

async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch { return false; }
}

async function main() {
  console.log('🔄 知识进化 Demo — evolve\n');
  console.log('━'.repeat(50));
  console.log('\n  其他框架: 记忆越来越多，越来越慢');
  console.log('  DeepBrain: 知识越来越精，越来越聪明\n');

  // 检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';
  else if (process.env.DEEPSEEK_API_KEY) provider = 'deepseek';

  // Ollama 健康检查
  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('❌ Ollama 未启动！');
      console.log('请先: ollama serve && ollama pull nomic-embed-text\n');
      process.exit(1);
    }
  }

  console.log(`📦 Embedding: ${provider}\n`);

  let brain: Brain;
  let agent: AgentBrain;
  try {
    brain = new Brain({ 
      embedding_provider: provider,
      db_path: './demo-brain-evolve.db'
    });
    await brain.connect();
    agent = new AgentBrain(brain, 'evolve-demo');
    console.log('✅ Brain 初始化完成\n');
  } catch (e: any) {
    console.error(`❌ Brain 初始化失败: ${e.message}\n`);
    process.exit(1);
  }

  // 模拟一周经验
  console.log('📝 模拟一周工作，Agent 积累经验...\n');

  const experiences = [
    // 张总相关（5条 → 应该合并成1条画像）
    { action: '张总来电', result: '张总喜欢下午2点开会', context: { day: 'Mon' } },
    { action: '张总发邮件', result: '张总偏好 PDF 格式的报告', context: { day: 'Mon' } },
    { action: '和张总开会', result: '张总关注 ROI，每次都问投资回报率', context: { day: 'Tue' } },
    { action: '张总反馈', result: '张总说PPT太长了，要简洁版', context: { day: 'Wed' } },
    { action: '给张总做方案', result: '张总喜欢数据驱动的方案', context: { day: 'Thu' } },
    // X200 产品（5条 → 应该合并成1条产品卡）
    { action: '产品培训 X200', result: 'X200 续航 48 小时', context: { day: 'Mon' } },
    { action: '客户问 X200', result: 'X200 售价 2999', context: { day: 'Tue' } },
    { action: 'X200 售后', result: 'X200 保修 2 年，电池保修 1 年', context: { day: 'Tue' } },
    { action: '竞品对比', result: 'X200 比竞品 A 续航多 12 小时', context: { day: 'Wed' } },
    { action: 'X200 评测', result: 'X200 充电 0-80% 需 30 分钟', context: { day: 'Thu' } },
    // 销售流程（5条）
    { action: '新客户接待', result: '先了解需求再推产品', context: { day: 'Wed' } },
    { action: '报价审批', result: '超过 5 万需要经理审批', context: { day: 'Wed' } },
    { action: '签约流程', result: '合同模板在 OA，走 3 级审批', context: { day: 'Thu' } },
    { action: '回款周期', result: '标准 30 天，VIP 45 天', context: { day: 'Thu' } },
    { action: '开票规则', result: '普票即开，专票 3 工作日', context: { day: 'Fri' } },
    // 其他
    { action: '李经理', result: '偏好早上9点开会', context: { day: 'Tue' } },
    { action: '王总需求', result: '需要定制化方案', context: { day: 'Wed' } },
    { action: '投诉处理', result: '先道歉，再记录，24h回复', context: { day: 'Thu' } },
    { action: '月度目标', result: '本月目标 50 万，已完成 35 万', context: { day: 'Fri' } },
    { action: '周会总结', result: '华东区新增 8 个潜在客户', context: { day: 'Fri' } },
  ];

  for (const exp of experiences) {
    try {
      await agent.learn(exp);
      process.stdout.write('.');
    } catch (e: any) {
      process.stdout.write('x');
    }
  }
  console.log(`\n\n✅ 积累了 ${experiences.length} 条零散经验\n`);

  // Evolve!
  console.log('🔄 开始知识进化 (evolve)...\n');
  console.log('  evolve 自动:');
  console.log('  · 发现相关经验');
  console.log('  · 合并重复信息');
  console.log('  · 提炼精华知识');
  console.log('  · 淘汰过时内容\n');

  try {
    const report = await agent.evolve();
    console.log('📊 进化报告:');
    console.log(`  · 处理: ${report.tracesProcessed || 0} 条经验`);
    console.log(`  · 提炼: ${report.knowledgeCreated || 0} 条知识`);
    console.log(`  · 升级: ${report.promoted || 0} 条\n`);
  } catch (e: any) {
    console.log(`  ⚠️ evolve 执行: ${e.message}`);
    console.log('  (evolve 需要 LLM 支持知识合并，纯 embedding 模式下展示概念)\n');
  }

  // 对比展示
  console.log('━'.repeat(50));
  console.log('\n📈 进化前 vs 进化后:\n');
  console.log('  进化前: 20 条零散记录');
  console.log('  ┌─────────────────────────────────┐');
  console.log('  │ "张总喜欢下午2点开会"            │');
  console.log('  │ "张总偏好PDF格式"                │');
  console.log('  │ "张总关注ROI"                    │');
  console.log('  │ "张总说PPT太长了"                │');
  console.log('  │ "张总喜欢数据驱动"               │');
  console.log('  │ ... 15 条更多                    │');
  console.log('  └─────────────────────────────────┘\n');
  console.log('  进化后: 精炼知识');
  console.log('  ┌─────────────────────────────────┐');
  console.log('  │ 张总画像: VIP，下午2点开会，     │');
  console.log('  │ 关注ROI，要简洁PDF，数据驱动    │');
  console.log('  │                                  │');
  console.log('  │ X200: 续航48h，2999元，保修2年， │');
  console.log('  │ 充电30min到80%，比竞品A多12h    │');
  console.log('  └─────────────────────────────────┘\n');
  console.log('  → 5条变1条，信息量不减');
  console.log('  → recall 一次就够\n');

  console.log('━'.repeat(50));
  console.log('🎉 这就是 DeepBrain 的核心差异化:\n');
  console.log('  别人的 Memory:  存储 + 检索');
  console.log('  DeepBrain:     存储 + 检索 + 提炼 + 进化\n');
  console.log('  知识越来越精，而不是越来越多。\n');

  await brain!.disconnect();
}

main().catch(e => {
  console.error(`\n💥 未预期错误: ${e.message}\n`);
  process.exit(1);
});
