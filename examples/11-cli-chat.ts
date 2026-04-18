/**
 * Demo 11: CLI Chat — 编程式多轮对话
 *
 * 用 BaseAgent + InMemoryStore 创建 agent，模拟多轮对话
 * 需要 Ollama qwen2.5: ollama pull qwen2.5
 *
 * 运行: npm run demo:cli-chat
 */

import { BaseAgent, InMemoryStore } from 'opc-agent';

console.log('\n=== Demo 11: CLI Chat — 编程式多轮对话 ===\n');

try {
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
    console.log(`You: ${msg}`);
    const response = await agent.handleMessage({
      id: String(Date.now()),
      content: msg,
      sender: 'user',
      channel: 'demo',
      sessionId: 'demo-1',
      timestamp: new Date(),
    });
    console.log(`Agent: ${response.content}\n`);
  }

  console.log('[DONE] Demo 完成!');
} catch (e: any) {
  console.error(`[ERROR] ${e.message}`);
  if (e.message.includes('ECONNREFUSED') || e.message.includes('fetch')) {
    console.log('  Ollama not running? Run: ollama serve');
    console.log('  Model missing? Run: ollama pull qwen2.5');
  }
  process.exit(1);
}
