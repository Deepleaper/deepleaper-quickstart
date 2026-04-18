/**
 * Demo 16: Built-in Tools — 内置工具
 *
 * 列举所有内置工具并实际调用
 *
 * 运行: npm run demo:tools
 */

import { getBuiltinTools } from 'opc-agent';

console.log('\n=== Demo 16: Built-in Tools ===\n');

try {
  const tools = getBuiltinTools('.');
  console.log(`Available tools: ${tools.length}\n`);

  for (const tool of tools) {
    console.log(`  [${tool.definition.name}]`);
    console.log(`    ${tool.definition.description}`);
    console.log(`    Params: ${JSON.stringify(tool.definition.parameters)}\n`);
  }

  // Try the datetime tool
  const dt = tools.find((t) => t.definition.name === 'datetime');
  if (dt) {
    const result = await dt.execute({});
    console.log(`Current time: ${result.content}`);
  }

  // Try file operations
  const fileTool = tools.find((t) => t.definition.name === 'file_operations');
  if (fileTool) {
    const result = await fileTool.execute({ action: 'list', path: '.' });
    console.log(`\nFiles in current dir:\n${result.content}`);
  }

  console.log('\n[DONE] Demo 完成!');
} catch (e: any) {
  console.error(`[ERROR] ${e.message}`);
  process.exit(1);
}
