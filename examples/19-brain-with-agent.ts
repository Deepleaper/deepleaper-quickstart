// Show DeepBrain + OPC Agent integration
import { Brain } from 'deepbrain';
import { BaseAgent, InMemoryStore } from 'opc-agent';
import { recommendModel } from 'agentkits';
import { getPopularRoles } from 'agent-workstation';

console.log('=== 4-Package Integration Demo ===\n');

// 1. agentkits: recommend a model
const models = recommendModel({ task: 'chat', budget: 'free', local: true });
console.log('Recommended models:', models.map(m => m.model).join(', '));

// 2. agent-workstation: find a role
const roles = getPopularRoles();
console.log(`Popular roles: ${roles.length}`);

// 3. Show the integration pattern
console.log(`
Integration pattern:
  1. agentkits recommends the best model for your task
  2. agent-workstation provides role templates with rich prompts
  3. deepbrain gives your agent persistent memory
  4. opc-agent ties it all together as the runtime
`);
