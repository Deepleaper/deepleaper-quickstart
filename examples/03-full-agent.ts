/**
 * Demo 3: OPC Agent — 声明式 Agent 开发
 * 
 * 无需 API Key，纯展示 OPC Agent 的设计理念和使用方式
 * 
 * 运行: npm run demo:agent
 */

async function main() {
  console.log('🤖 OPC Agent Demo — Agent OS\n');
  console.log('━'.repeat(50));

  // 1. OPC Agent 是什么
  console.log('\n📋 OPC Agent = Agent OS\n');
  console.log('  不只是框架，是 Agent 的操作系统。');
  console.log('  一个 YAML 声明，就是一个完整的 Agent。\n');

  // 2. CLI 工具链
  console.log('🛠️  CLI 命令:\n');
  const commands = [
    ['opc init my-agent', '创建新 Agent（生成 OAD + 目录结构）'],
    ['opc dev',           '本地开发（热重载）'],
    ['opc test',          '运行测试（内置测试框架）'],
    ['opc run',           '启动 Agent'],
    ['opc logs',          '查看运行日志'],
    ['opc brain',         'DeepBrain 记忆管理'],
    ['opc score',         '评估 Agent 表现'],
  ];
  for (const [cmd, desc] of commands) {
    console.log(`  ${cmd.padEnd(22)} ${desc}`);
  }

  // 3. OAD 声明式配置
  console.log('\n\n📝 OAD (Open Agent Declaration) 示例:\n');
  const oad = {
    id: 'customer-service-agent',
    name: '客服助手',
    version: '1.0.0',
    ego: {
      role: '专业客服',
      personality: '耐心、专业、简洁',
      rules: ['先确认问题再回答', '复杂问题转人工'],
    },
    model: {
      provider: 'ollama',        // 本地运行
      name: 'qwen2.5',
    },
    skills: [
      'ticket-management',
      'knowledge-base-search',
      'escalation',
    ],
    channels: [
      { type: 'web', priority: 'primary' },
      { type: 'telegram' },
      { type: 'wechat' },
      { type: 'feishu' },
    ],
    memory: {
      provider: 'deepbrain',     // Agent 越用越聪明
      autoLearn: true,
      autoEvolve: true,
    },
  };
  console.log(JSON.stringify(oad, null, 2));

  // 4. 11 个渠道
  console.log('\n\n📡 支持 11 个渠道:\n');
  const channels = [
    ['Web',       '网页聊天窗口'],
    ['Telegram',  'Bot API'],
    ['Slack',     'Slack App'],
    ['Discord',   'Discord Bot'],
    ['微信',      '微信公众号 / 企业微信'],
    ['飞书',      '飞书机器人'],
    ['Email',     '邮件自动回复'],
    ['Voice',     '语音通话'],
    ['WebSocket', '实时双向通信'],
    ['Webhook',   'HTTP 回调'],
    ['API',       'RESTful API'],
  ];
  for (const [ch, desc] of channels) {
    console.log(`  ${ch.padEnd(12)} ${desc}`);
  }

  // 5. 与 DeepBrain 集成
  console.log('\n\n🧠 与 DeepBrain 深度集成:\n');
  console.log('  Agent 运行时自动:');
  console.log('  · 每次对话后 learn() — 积累经验');
  console.log('  · 每次对话前 recall() — 调用记忆');
  console.log('  · 定时 evolve() — 知识进化');
  console.log('  · Traces → DeepBrain — 结构化学习');

  console.log('\n━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log('快速开始:');
  console.log('  npx opc-agent init my-agent');
  console.log('  cd my-agent');
  console.log('  npx opc-agent dev\n');
  console.log('文档: https://github.com/Deepleaper/opc-agent\n');
}

main().catch(console.error);
