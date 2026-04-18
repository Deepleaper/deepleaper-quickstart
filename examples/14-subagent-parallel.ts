// Show parallel sub-agent execution
import { BaseAgent, SubAgentManager, InMemoryStore } from 'opc-agent';

const manager = new SubAgentManager();

console.log('Spawning 3 sub-agents in parallel...');
// Note: These would need a real LLM to run. This shows the API.
console.log(`
API Example:
  const results = await manager.spawnParallel([
    { name: 'researcher', task: 'Research latest AI frameworks' },
    { name: 'writer', task: 'Write a blog post outline about AI agents' },
    { name: 'reviewer', task: 'Review our README for improvements' },
  ], provider);

  results.forEach(r => {
    console.log(\`\${r.name}: \${r.status} (\${r.duration}ms)\`);
  });
`);

// Show list/kill API
console.log('Sub-agent management:');
console.log('  manager.list()  — list all sub-agents');
console.log('  manager.kill(id) — terminate a sub-agent');
