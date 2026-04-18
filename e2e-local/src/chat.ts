import { BaseAgent, InMemoryStore } from 'opc-agent';
import * as readline from 'readline';

async function main() {
  // Check Ollama
  try {
    await fetch('http://localhost:11434/api/tags');
  } catch {
    console.error('❌ Ollama not running! Start it first.');
    process.exit(1);
  }

  const agent = new BaseAgent({
    name: 'local-chat',
    systemPrompt: '你是一个智能助手，用中文回答，简洁有用。你有记忆能力。',
    provider: 'ollama',
    model: 'qwen2.5:3b',
    memory: new InMemoryStore(),
  });
  await agent.init();

  console.log('🤖 OPC Agent Interactive Chat (local)');
  console.log('Type your message, or /quit to exit\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
  const ask = () => {
    rl.question('👤 You: ', async (input) => {
      if (!input?.trim() || input === '/quit') {
        console.log('Bye! 👋');
        rl.close();
        return;
      }
      const response = await agent.handleMessage({
        id: String(Date.now()),
        content: input,
        sender: 'user',
        channel: 'chat',
        sessionId: 'interactive',
        timestamp: new Date(),
      });
      console.log(`🤖 Agent: ${response.content}\n`);
      ask();
    });
  };
  ask();
}

main().catch(console.error);
