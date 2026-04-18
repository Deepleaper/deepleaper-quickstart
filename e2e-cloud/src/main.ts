import { BaseAgent, InMemoryStore, getBuiltinTools } from 'opc-agent';

async function main() {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1';
  const model = process.env.LLM_MODEL || 'deepseek-chat';

  if (!apiKey) {
    console.error('❌ Please set LLM_API_KEY environment variable');
    console.log('\nExamples:');
    console.log('  # DeepSeek (recommended, cheap)');
    console.log('  $env:LLM_API_KEY = "sk-xxx"');
    console.log('  $env:LLM_BASE_URL = "https://api.deepseek.com/v1"');
    console.log('  $env:LLM_MODEL = "deepseek-chat"');
    process.exit(1);
  }

  console.log(`☁️ OPC Agent — Cloud API`);
  console.log(`  Model: ${model}`);
  console.log(`  Base URL: ${baseUrl}\n`);

  // Set env for opc-agent
  process.env.OPENAI_API_KEY = apiKey;
  process.env.OPENAI_BASE_URL = baseUrl;

  const agent = new BaseAgent({
    name: 'cloud-assistant',
    systemPrompt: `你是一个智能助手。用中文回答，简洁有用。你有记忆和工具能力。`,
    provider: 'openai',
    model: model,
    memory: new InMemoryStore(),
  });
  await agent.init();
  console.log('✅ Agent initialized\n');

  // Demo conversation
  const messages = [
    '你好！我是 Ray，我在做一个 AI Agent 框架',
    '帮我分析一下 AI Agent 市场现在的竞争格局',
    '你还记得我在做什么吗？',
    '用一句话总结我们的对话',
  ];

  for (const msg of messages) {
    console.log(`👤 ${msg}`);
    const response = await agent.handleMessage({
      id: String(Date.now()),
      content: msg,
      sender: 'Ray',
      channel: 'demo',
      sessionId: 'demo-session',
      timestamp: new Date(),
    });
    console.log(`🤖 ${response.content}\n`);
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('✨ Demo complete! Run `npm run chat` for interactive mode.');
}

main().catch(console.error);
