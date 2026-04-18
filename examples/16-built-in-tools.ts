// Show built-in tools
import { getBuiltinTools } from 'opc-agent';

const tools = getBuiltinTools('.');
console.log(`Available tools: ${tools.length}\n`);

for (const tool of tools) {
  console.log(`📦 ${tool.definition.name}`);
  console.log(`   ${tool.definition.description}`);
  console.log(`   Parameters: ${JSON.stringify(tool.definition.parameters)}\n`);
}

// Try the datetime tool
const dt = tools.find(t => t.definition.name === 'datetime');
if (dt) {
  const result = await dt.execute({});
  console.log(`Current time: ${result.content}`);
}

// Try file operations
const fileTool = tools.find(t => t.definition.name === 'file_operations');
if (fileTool) {
  const result = await fileTool.execute({ action: 'list', path: '.' });
  console.log(`Files in current dir:\n${result.content}`);
}
