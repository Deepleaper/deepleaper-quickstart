import { BaseAgent, InMemoryStore } from 'opc-agent';
import * as readline from 'readline';

async function main() {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1';
  const model = process.env.LLM_MODEL || 'deepseek-chat';

  if (!apiKey) {
    console.error('❌ Please set LLM_API_KEY first. See README.md for examples.');
    process.exit(1);
  }

  process.env.OPENAI_API_KEY = apiKey;
  process.env.OPENAI_BASE_URL = baseUrl;

  const agent = new BaseAgent({
    name: 'cloud-chat',
    systemPrompt: '你是一个智能助手，用中文回答，简洁有用。你有记忆能力。',
    provider: 'openai',
    model: model,
    memory: new InMemoryStore(),
  });
  await agent.init();

  console.log(`☁️ OPC Agent Interactive Chat (${model})`);
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
        role: 'user',
        content: input,
        timestamp: Date.now(),
      });
      console.log(`🤖 Agent: ${response.content}\n`);
      ask();
    });
  };
  ask();
}

main().catch(console.error);
