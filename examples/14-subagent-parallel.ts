/**
 * Demo 14: Sub-Agent Parallel — 并行子代理 API
 *
 * SubAgentManager API: spawn, list, kill
 * 展示多代理并行编排
 *
 * 运行: npm run demo:parallel
 */

import { BaseAgent, SubAgentManager, InMemoryStore } from 'opc-agent';

console.log('\n=== Demo 14: Sub-Agent Parallel ===\n');

try {
  const manager = new SubAgentManager();

  console.log('SubAgentManager API:');
  console.log('');
  console.log('  // Spawn parallel sub-agents');
  console.log('  const results = await manager.spawnParallel([');
  console.log('    { name: "researcher", task: "Research latest AI frameworks" },');
  console.log('    { name: "writer",     task: "Write a blog post outline" },');
  console.log('    { name: "reviewer",   task: "Review README for improvements" },');
  console.log('  ], provider);');
  console.log('');
  console.log('  // Each result has: name, status, duration, output');
  console.log('  results.forEach(r => {');
  console.log('    console.log(`${r.name}: ${r.status} (${r.duration}ms)`);');
  console.log('  });');
  console.log('');
  console.log('Management:');
  console.log('  manager.list()    — list all sub-agents');
  console.log('  manager.kill(id)  — terminate a sub-agent');

  console.log('\n[DONE] Demo 完成!');
} catch (e: any) {
  console.error(`[ERROR] ${e.message}`);
  process.exit(1);
}
