// Show how to programmatically create an agent and chat with it
import { BaseAgent, InMemoryStore } from 'opc-agent';

const agent = new BaseAgent({
  name: 'quick-chat',
  systemPrompt: 'You are a helpful assistant. Be concise.',
  provider: 'ollama',
  model: 'qwen2.5',
  memory: new InMemoryStore(),
});
await agent.init();

// Simulate a conversation
const messages = [
  'What is TypeScript?',
  'How is it different from JavaScript?',
  'Give me a quick example',
];

for (const msg of messages) {
  console.log(`\nYou: ${msg}`);
  const response = await agent.handleMessage({
    id: String(Date.now()),
    content: msg,
    sender: 'user',
    channel: 'demo',
    sessionId: 'demo-1',
    timestamp: new Date(),
  });
  console.log(`Agent: ${response.content}`);
}
