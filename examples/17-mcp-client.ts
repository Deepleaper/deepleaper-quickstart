/**
 * Demo 17: MCP Client — 模型上下文协议
 *
 * 展示 MCPClient API (需要 MCP server)
 *
 * 运行: npm run demo:mcp
 */

import { MCPClient } from 'opc-agent';

console.log('\n=== Demo 17: MCP Client ===\n');

console.log('MCP (Model Context Protocol) client usage:\n');
console.log('  const client = new MCPClient({');
console.log('    name: "filesystem",');
console.log('    command: "npx",');
console.log('    args: ["@modelcontextprotocol/server-filesystem", "./workspace"],');
console.log('  });\n');
console.log('  await client.connect();');
console.log('  const tools = await client.listTools();');
console.log('  const result = await client.callTool("read_file", { path: "README.md" });');
console.log('  await client.disconnect();\n');

console.log('[DONE] Demo 完成!');
