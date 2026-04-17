/**
 * Demo 3: OPC Agent — 声明式 Agent 开发
 * 
 * 纯展示，无需 API Key 或 Ollama
 * 
 * 运行: npm run demo:agent
 */

async function main() {
  console.log('🤖 OPC Agent Demo — Agent OS\n');
  console.log('━'.repeat(50));

  // 1. 什么是 OPC Agent
  console.log('\n📋 OPC Agent = Agent OS\n');
  console.log('  不只是框架，是 Agent 的操作系统。');
  console.log('  一个 YAML 声明，就是一个完整的 Agent。\n');

  // 2. CLI
  console.log('🛠️  CLI 命令:\n');
  const commands = [
    ['opc init my-agent', '创建新 Agent'],
    ['opc dev',           '本地开发（热重载）'],
    ['opc test',          '运行测试'],
    ['opc run',           '启动 Agent'],
    ['opc logs',          '查看日志'],
    ['opc brain',         'DeepBrain 记忆管理'],
    ['opc score',         '评估表现'],
  ];
  for (const [cmd, desc] of commands) {
    console.log(`  ${cmd.padEnd(22)} ${desc}`);
  }

  // 3. OAD 配置
  console.log('\n\n📝 OAD 声明式配置:\n');
  const oad = {
    id: 'customer-service-agent',
    name: '客服助手',
    version: '1.0.0',
    ego: {
      role: '专业客服',
      personality: '耐心、专业、简洁',
      rules: ['先确认问题再回答', '复杂问题转人工'],
    },
    model: { provider: 'ollama', name: 'qwen2.5' },
    skills: ['ticket-management', 'knowledge-base-search'],
    channels: [
      { type: 'web', priority: 'primary' },
      { type: 'telegram' },
      { type: 'wechat' },
    ],
    memory: {
      provider: 'deepbrain',
      autoLearn: true,
      autoEvolve: true,
    },
  };
  console.log(JSON.stringify(oad, null, 2));

  // 4. 渠道
  console.log('\n\n📡 11 个渠道:\n');
  const channels = [
    ['Web',       '网页聊天'],    ['Telegram',  'Bot'],
    ['Slack',     'App'],         ['Discord',   'Bot'],
    ['微信',      '公众号/企微'],  ['飞书',      '机器人'],
    ['Email',     '邮件'],        ['Voice',     '语音'],
    ['WebSocket', '实时通信'],    ['Webhook',   'HTTP'],
    ['API',       'REST'],
  ];
  for (const [ch, desc] of channels) {
    console.log(`  ${ch.padEnd(12)} ${desc}`);
  }

  // 5. 与 DeepBrain 集成
  console.log('\n\n🧠 DeepBrain 集成:\n');
  console.log('  每次对话: learn() → 积累经验');
  console.log('  每次请求: recall() → 调用记忆');
  console.log('  定时任务: evolve() → 知识进化');

  console.log('\n━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log('快速开始:');
  console.log('  npx opc-agent init my-agent');
  console.log('  cd my-agent && npx opc-agent dev\n');
}

main().catch(e => {
  console.error(`\n💥 错误: ${e.message}\n`);
  process.exit(1);
});
