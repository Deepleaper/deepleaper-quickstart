/**
 * Demo 09: 多 Agent 协作 (opc-agent 1.4.0 概念)
 *
 * 主 Agent 分发子任务 → 子 Agent 并行执行 → 汇总结果
 * 纯概念展示
 *
 * 运行: npm run demo:subagent
 */

console.log('\n=== Demo 09: 多 Agent 协作 (Sub-Agent) ===\n');
console.log('='.repeat(50));

console.log('\n>> OPC Agent 1.4.0 Sub-Agent 架构:\n');

console.log('  Main Agent (coordinator)');
console.log('  |-- Sub-Agent A: Research task      [parallel]');
console.log('  |-- Sub-Agent B: Code generation     [parallel]');
console.log('  |-- Sub-Agent C: Documentation       [parallel]');
console.log('  +-- Main Agent: Synthesize results\n');

console.log('>> 核心特性:');
console.log('  - Parallel:    子 Agent 并发执行，不互相阻塞');
console.log('  - Isolated:    每个子 Agent 有独立的记忆和工具');
console.log('  - Auto-push:   结果完成后自动推送给父 Agent');
console.log('  - Depth limit: 可配置嵌套深度 (默认最大 3 层)\n');

// 概念代码
console.log('>> 内部 API (opc-agent runtime 内部):');
console.log('');
console.log('  const manager = new SubAgentManager(mainAgent);');
console.log('');
console.log('  // 并行 spawn 子 Agent');
console.log('  const tasks = [');
console.log('    manager.spawn({ task: "Research competitor X", label: "research" }),');
console.log('    manager.spawn({ task: "Write unit tests for Y", label: "testing" }),');
console.log('    manager.spawn({ task: "Update docs for Z", label: "docs" }),');
console.log('  ];');
console.log('');
console.log('  // 结果自动推送回来');
console.log('  const results = await Promise.all(tasks);');
console.log('  mainAgent.synthesize(results);');
console.log('');

console.log('>> 体验 sub-agent:');
console.log('  npm i -g opc-agent');
console.log('  opc chat');
console.log('  # 尝试: "Research React vs Vue, write comparison, create demo — all in parallel"\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:roles (角色搜索)\n');
