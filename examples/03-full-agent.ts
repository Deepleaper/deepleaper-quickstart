/**
 * Demo 3: OPC Agent 完整 Agent
 * 
 * 需要 API Key: export OPENAI_API_KEY=sk-xxx
 * 
 * 运行: npm run demo:agent
 */

async function main() {
  console.log('🤖 OPC Agent 完整 Demo\n');
  console.log('━'.repeat(50));

  const apiKey = process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.log('⚠️  需要设置 API Key:');
    console.log('   export OPENAI_API_KEY=sk-xxx');
    console.log('');
    console.log('没有 API Key？试试: npm run demo:basic');
    process.exit(0);
  }

  console.log('\n📋 OPC Agent 支持的能力:\n');
  console.log('  创建: opc init my-agent');
  console.log('  开发: opc dev (热重载)');
  console.log('  测试: opc test (内置测试框架)');
  console.log('  运行: opc run');
  console.log('  监控: opc logs / opc score');
  console.log('  记忆: opc brain (DeepBrain 集成)');
  console.log('');
  console.log('  渠道: Web / Telegram / Slack / Discord / 微信 / 飞书');
  console.log('         Email / Voice / WebSocket / Webhook / API');
  console.log('');

  // Demo: OAD 声明式配置
  console.log('📝 OAD 声明式配置示例:\n');
  const oad = {
    id: 'customer-service-agent',
    name: '客服助手',
    version: '1.0.0',
    model: 'deepseek-chat',
    systemPrompt: '你是一个专业的客服助手，回答简洁专业。',
    skills: ['ticket-management', 'knowledge-base-search'],
    channels: [
      { type: 'web', priority: 'primary' },
      { type: 'telegram', priority: 'secondary' },
    ],
    memory: {
      shortTerm: true,
      longTerm: { provider: 'deepbrain' }
    }
  };
  console.log(JSON.stringify(oad, null, 2));

  console.log('\n━'.repeat(50));
  console.log('🎉 Demo 完成！');
  console.log('');
  console.log('要创建真实 Agent，运行:');
  console.log('  npx opc-agent init my-agent');
  console.log('  cd my-agent && npx opc-agent dev');
  console.log('');
}

main().catch(console.error);
