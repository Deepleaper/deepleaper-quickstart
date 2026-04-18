// Show MCP client usage (conceptual — needs an MCP server)
import { MCPClient } from 'opc-agent';

console.log('MCP Client Example:');
console.log(`
  const client = new MCPClient({
    name: 'filesystem',
    command: 'npx',
    args: ['@modelcontextprotocol/server-filesystem', './workspace'],
  });

  await client.connect();
  const tools = await client.listTools();
  console.log('Available MCP tools:', tools.map(t => t.name));

  const result = await client.callTool('read_file', { path: 'README.md' });
  console.log(result);

  await client.disconnect();
`);
