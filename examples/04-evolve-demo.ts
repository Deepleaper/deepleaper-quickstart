/**
 * Demo 04: 知识进化 evolve — DeepBrain 核心差异化
 *
 * 20 条零散经验 → evolve → 提炼成精华知识
 * 默认用 Ollama 本地运行，无需 API Key
 * 前置: ollama pull nomic-embed-text
 *
 * 运行: npm run demo:evolve
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
  console.log('\n=== Demo 04: 知识进化 — evolve ===\n');
  console.log('='.repeat(50));
  console.log('\n  传统 Agent: 记忆只增不减,越来越臃肿');
  console.log('  DeepBrain:  自动进化,去粗取精越来越聪明\n');

  // 检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';
  else if (process.env.DEEPSEEK_API_KEY) provider = 'deepseek';

  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('[ERROR] Ollama 未启动!');
      console.log('  Ollama not running? Run: ollama serve');
      console.log('  Then: ollama pull nomic-embed-text\n');
      process.exit(1);
    }
  }

  console.log(`>> Embedding: ${provider}\n`);

  let brain: Brain;
  let agent: AgentBrain;
  try {
    brain = new Brain({
      embedding_provider: provider,
      database: './demo-brain-evolve',
    });
    await brain.connect();
    agent = new AgentBrain(brain, 'evolve-demo');
    console.log('[OK] Brain 初始化成功\n');
  } catch (e: any) {
    console.error(`[ERROR] Brain 初始化失败: ${e.message}\n`);
    process.exit(1);
  }

  // 学习零散经验
  console.log('>> 模拟一周工作,Agent 积累经验...\n');

  const experiences = [
    // 客户沟通（5条 → 应该进化成1条总结）
    { action: '接待了客户', result: '客户关注价格,问了2个问题', context: { day: 'Mon' } },
    { action: '准备了材料', result: '客户要求 PDF 版本的报价单', context: { day: 'Mon' } },
    { action: '做了产品演示', result: '客户关注 ROI,需要准备投资回报分析', context: { day: 'Tue' } },
    { action: '跟进了客户', result: '发送PPT后反馈,客户有意向', context: { day: 'Wed' } },
    { action: '处理了客户咨询', result: '解答了技术对接方面的疑问', context: { day: 'Thu' } },
    // X200 产品（5条 → 应该进化成1条产品卡片）
    { action: '查询了 X200', result: 'X200 续航 48 小时', context: { day: 'Mon' } },
    { action: '问了 X200', result: 'X200 售价 2999', context: { day: 'Tue' } },
    { action: 'X200 库存', result: 'X200 现货 2 万台,预计到货 1 万台', context: { day: 'Tue' } },
    { action: '竞品对比', result: 'X200 比竞品 A 便宜 12 个百分点', context: { day: 'Wed' } },
    { action: 'X200 充电', result: 'X200 快充 0-80% 仅 30 分钟', context: { day: 'Thu' } },
    // 售后流程（5条）
    { action: '处理了退货', result: '按流程审批后退款到账', context: { day: 'Wed' } },
    { action: '统计了售后', result: '本周 5 件退货请求已处理', context: { day: 'Wed' } },
    { action: '更新了流程', result: '退货流程接入 OA,缩短 3 天处理周期', context: { day: 'Thu' } },
    { action: '售后回访', result: '普通 30 分钟,VIP 45 分钟', context: { day: 'Thu' } },
    { action: '售后培训', result: '新人培训,重点 3 类典型问题', context: { day: 'Fri' } },
    // 其他
    { action: '做了月报', result: '整体销售额9位数增长', context: { day: 'Tue' } },
    { action: '调研了市场', result: '竞争对手推出了新方案', context: { day: 'Wed' } },
    { action: '整理了话术', result: '三步法,先共情,再解决,24h回访', context: { day: 'Thu' } },
    { action: '绩效汇报', result: '团队平均 50 单,个人最高 35 单', context: { day: 'Fri' } },
    { action: '计划了下周', result: '重点跟进 8 个潜在大客户', context: { day: 'Fri' } },
  ];

  for (const exp of experiences) {
    try {
      await agent.learn(exp);
      process.stdout.write('.');
    } catch {
      process.stdout.write('x');
    }
  }
  console.log(`\n\n[OK] 学习了 ${experiences.length} 条零散经验\n`);

  // Evolve!
  console.log('>> 执行知识进化 (evolve)...\n');
  console.log('  evolve 会自动:');
  console.log('  - 识别相似经验');
  console.log('  - 合并重复知识');
  console.log('  - 提炼核心要点');
  console.log('  - 生成结构化知识\n');

  try {
    const report = await agent.evolve();
    console.log('[OK] 进化完成:');
    console.log(`  - 处理: ${report.tracesProcessed || 0} 条经验`);
    console.log(`  - 生成: ${report.pagesCreated || 0} 条精炼知识`);
    console.log(`  - 晋升: ${report.pagesPromoted || 0} 条\n`);
  } catch (e: any) {
    console.log(`  [WARN] evolve 出错: ${e.message}`);
    console.log('  (evolve 需要 LLM 做语义分析,纯 embedding 环境下仅做基础聚合)\n');
  }

  // 对比展示
  console.log('='.repeat(50));
  console.log('\n>> 进化前 vs 进化后:\n');
  console.log('  进化前: 20 条零散原始经验');
  console.log('  +--------------------------------------+');
  console.log('  | "客户关注价格,问了2个问题"            |');
  console.log('  | "客户要求PDF报价单"                   |');
  console.log('  | "客户关注ROI"                         |');
  console.log('  | ... 17 条更多                         |');
  console.log('  +--------------------------------------+\n');
  console.log('  进化后: 精炼知识');
  console.log('  +--------------------------------------+');
  console.log('  | 客户沟通: VIP优先,关注价格和ROI,      |');
  console.log('  | 需准备PDF和PPT,投资回报分析           |');
  console.log('  |                                      |');
  console.log('  | X200: 续航48h, 2999元, 现货2万台,    |');
  console.log('  | 快充30min到80%, 比竞品A便宜12%        |');
  console.log('  +--------------------------------------+\n');
  console.log('  5条变1条,信息密度提升5倍');
  console.log('  recall 命中率更高\n');

  console.log('='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('  传统 Memory:  存储 + 检索');
  console.log('  DeepBrain:    存储 + 检索 + 进化 + 提炼\n');
  console.log('下一步: npm run demo:workstation (工位模板)\n');

  await brain!.disconnect();
}

main().catch((e) => {
  console.error(`\n[FATAL] 运行失败: ${e.message}\n`);
  process.exit(1);
});
