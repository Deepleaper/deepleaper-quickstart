import { BaseAgent, InMemoryStore, getBuiltinTools, SkillRegistry, BaseSkill } from 'opc-agent';

// --- FAQ Skill ---
class FAQSkill extends BaseSkill {
  name = 'faq';
  description = 'Answer frequently asked questions';
  triggers = [/退款|退货|配送|支付|FAQ|常见问题/i];

  async execute(input: string): Promise<string> {
    const faqs: Record<string, string> = {
      '退款': '💰 退款将在3-5个工作日内原路退回。',
      '退货': '📦 收到商品7天内可申请退货，请保持商品完好。',
      '配送': '🚚 标准配送3-5天，加急配送1-2天，偏远地区可能延长。',
      '支付': '💳 支持支付宝、微信支付、银行卡、花呗。',
    };
    for (const [key, answer] of Object.entries(faqs)) {
      if (input.includes(key)) return answer;
    }
    return '常见问题：退款 | 退货 | 配送 | 支付\n请问您想了解哪个？';
  }
}

// --- Main ---
async function main() {
  console.log('🤖 OPC Agent — 纯本地版\n');

  // Check Ollama
  try {
    const r = await fetch('http://localhost:11434/api/tags');
    const d = await r.json() as any;
    console.log(`✅ Ollama running — ${d.models?.length || 0} models available`);
  } catch {
    console.error('❌ Ollama is not running! Please start it: https://ollama.ai');
    process.exit(1);
  }

  // Create agent
  const agent = new BaseAgent({
    name: 'local-assistant',
    systemPrompt: `你是一个智能助手。回复简洁有用，用中文回答。`,
    provider: 'ollama',
    model: 'qwen2.5:3b',
    memory: new InMemoryStore(),
  });
  await agent.init();
  console.log('✅ Agent initialized\n');

  // Demo conversation
  const messages = [
    '你好！我是 Ray，我在做一个 AI 公司',
    '我想了解退款政策',
    '你还记得我的名字吗？',
    '现在几点了？',
    '帮我总结一下我们聊了什么',
  ];

  for (const msg of messages) {
    console.log(`👤 ${msg}`);
    
    // Check FAQ skill first
    const faqSkill = new FAQSkill();
    if (faqSkill.triggers.some(t => t.test(msg))) {
      const answer = await faqSkill.execute(msg);
      console.log(`🤖 [FAQ] ${answer}\n`);
      continue;
    }

    const response = await agent.handleMessage({
      id: String(Date.now()),
      content: msg,
      sender: 'Ray',
      channel: 'demo',
      sessionId: 'demo-session',
      timestamp: new Date(),
    });
    console.log(`🤖 ${response.content}\n`);
  }

  // Show tools
  const tools = getBuiltinTools('.');
  console.log(`\n🔧 可用工具: ${tools.map(t => t.definition.name).join(', ')}`);
  
  console.log('\n✨ Demo complete! Run `npm run chat` for interactive mode.');
}

main().catch(console.error);
