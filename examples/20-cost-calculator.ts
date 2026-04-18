// Compare model costs for different workloads
import { estimateModelCost, recommendModel } from 'agentkits';

const workloads = [
  { name: 'Light chat (1K in, 500 out)', input: 1000, output: 500 },
  { name: 'Document analysis (10K in, 2K out)', input: 10000, output: 2000 },
  { name: 'Code generation (5K in, 10K out)', input: 5000, output: 10000 },
];

const models = ['gpt-4o', 'claude-3.5-sonnet', 'deepseek-chat', 'gpt-4o-mini'];

console.log('=== Model Cost Comparison ===\n');

for (const workload of workloads) {
  console.log(`📊 ${workload.name}`);
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
