/**
 * Demo 14: Sub-Agent Parallel - 子代理并行 API
 *
 * SubAgentManager API: spawn, list, kill
 * 多个子代理并行执行任务
 *
 * 运行: npm run demo:parallel
 */

console.log('\n=== Demo 14: Sub-Agent Parallel ===\n');
console.log('='.repeat(50));

console.log('\n>> SubAgentManager API (opc-agent runtime 内置):\n');
console.log('  import { SubAgentManager } from "opc-agent";\n');
console.log('  const manager = new SubAgentManager();\n');
console.log('  // Spawn parallel sub-agents');
console.log('  const results = await manager.spawnParallel([');
console.log('    { name: "researcher", task: "Research latest AI frameworks" },');
console.log('    { name: "writer",     task: "Write a blog post outline" },');
console.log('    { name: "reviewer",   task: "Review README for improvements" },');
console.log('  ], provider);\n');
console.log('  // Each result has: name, status, duration, output');
console.log('  results.forEach(r => {');
console.log('    console.log(`${r.name}: ${r.status} (${r.duration}ms)`);');
console.log('  });\n');
console.log('  // Management');
console.log('  manager.list()    // list all sub-agents');
console.log('  manager.kill(id)  // terminate a sub-agent\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:telegram (Telegram Bot)\n');
