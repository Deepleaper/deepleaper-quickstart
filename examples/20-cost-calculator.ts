/**
 * Demo 20: Cost Calculator — 模型成本对比
 *
 * 对比不同模型在不同工作负载下的 token 成本
 *
 * 运行: npm run demo:cost
 */

import { estimateModelCost, recommendModel } from 'agentkits';

console.log('\n=== Demo 20: 模型成本对比 ===\n');

const workloads = [
  { name: 'Light chat (1K in, 500 out)', input: 1000, output: 500 },
  { name: 'Document analysis (10K in, 2K out)', input: 10000, output: 2000 },
  { name: 'Code generation (5K in, 10K out)', input: 5000, output: 10000 },
];

const models = ['gpt-4o', 'claude-3.5-sonnet', 'deepseek-chat', 'gpt-4o-mini'];

for (const workload of workloads) {
  console.log(`>> ${workload.name}`);
  for (const model of models) {
    try {
      const cost = estimateModelCost(model, workload.input, workload.output);
      console.log(`  ${model.padEnd(20)} $${cost.cost.toFixed(4)}`);
    } catch {
      console.log(`  ${model.padEnd(20)} (pricing unavailable)`);
    }
  }
  console.log('');
}

console.log('[DONE] Demo 完成!');
