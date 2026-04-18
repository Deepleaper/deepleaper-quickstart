/**
 * Demo 16: Built-in Tools - 内置工具
 *
 * 展示如何使用内置工具扩展 Agent 能力
 *
 * 运行: npm run demo:tools
 */

console.log('\n=== Demo 16: Built-in Tools ===\n');
console.log('='.repeat(50));

console.log('\n>> OPC Agent 内置工具:\n');

const tools = [
  { name: 'datetime', desc: '获取当前时间、日期、时区信息' },
  { name: 'file_operations', desc: '文件读写、列目录、创建文件' },
  { name: 'web_fetch', desc: '抓取网页内容并转为文本' },
  { name: 'shell_exec', desc: '执行 shell 命令(受安全策略控制)' },
  { name: 'calculator', desc: '数学计算和表达式求值' },
  { name: 'json_transform', desc: 'JSON 数据转换和查询' },
  { name: 'text_analysis', desc: '文本分析、摘要、关键词提取' },
];

for (const tool of tools) {
  console.log(`  [${tool.name}]`);
  console.log(`    ${tool.desc}\n`);
}

console.log('>> 使用方式 (agent.yaml):\n');
console.log('  spec:');
console.log('    tools:');
console.log('      builtin:');
console.log('        - file_operations');
console.log('        - web_fetch');
console.log('        - shell_exec');
console.log('        - datetime\n');

console.log('>> 编程方式:\n');
console.log('  import { getBuiltinTools } from "opc-agent";');
console.log('  const tools = getBuiltinTools(".");');
console.log('  const dt = tools.find(t => t.definition.name === "datetime");');
console.log('  const result = await dt.execute({});\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:mcp (MCP 客户端)\n');
