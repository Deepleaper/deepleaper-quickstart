/**
 * Demo 03: OPC Agent — 完整 Agent 创建和对话
 *
 * 纯展示，无需 API Key 或 Ollama
 * 展示 OAD 声明式配置、CLI 命令、11 渠道支持
 *
 * 运行: npm run demo:agent
 */

async function main() {
  console.log('\n=== Demo 03: OPC Agent — Agent OS 完整展示 ===\n');
  console.log('='.repeat(50));

  // 1. 介绍 OPC Agent
  console.log('\n>> OPC Agent = Agent OS\n');
  console.log('  一个声明式框架，让 Agent 开发像写配置一样简单');
  console.log('  用一份 YAML 配置，就能创建功能完整的 Agent\n');

  // 2. CLI 命令一览
  console.log('>> CLI 命令:\n');
  const commands: [string, string][] = [
    ['opc init my-agent', '创建新 Agent'],
    ['opc dev', '开发模式(热重载)'],
    ['opc test', '运行测试'],
    ['opc run', '启动 Agent'],
    ['opc logs', '查看日志'],
    ['opc brain', 'DeepBrain 管理面板'],
    ['opc score', '性能评分'],
  ];
  for (const [cmd, desc] of commands) {
    console.log(`  ${cmd.padEnd(22)} # ${desc}`);
  }

  // 3. OAD 配置示例
  console.log('\n\n>> OAD 声明式配置示例:\n');
  const oad = {
    id: 'customer-service-agent',
    name: '智能客服',
    version: '1.0.0',
    ego: {
      role: '客服专家',
      personality: '专业、耐心、乐于助人',
      rules: ['回复不超过三句话', '敏感问题转人工'],
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
  console.log('\n\n>> 支持 11 个渠道:\n');
  const channels: [string, string][] = [
    ['Web', '网页聊天'],
    ['Telegram', 'Bot'],
    ['Slack', 'App'],
    ['Discord', 'Bot'],
    ['微信', '公众号/小程序'],
    ['钉钉', '机器人'],
    ['Email', '邮件'],
    ['Voice', '语音'],
    ['WebSocket', '实时双向'],
    ['Webhook', 'HTTP'],
    ['API', 'REST'],
  ];
  for (const [ch, desc] of channels) {
    console.log(`  ${ch.padEnd(12)} ${desc}`);
  }

  // 5. DeepBrain 集成
  console.log('\n\n>> DeepBrain 集成:\n');
  console.log('  自动学习: learn()  每次对话后学习');
  console.log('  智能检索: recall() 用记忆增强回复');
  console.log('  知识进化: evolve() 自动提炼精华');

  console.log('\n' + '='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('动手试试:');
  console.log('  npx opc-agent init my-agent');
  console.log('  cd my-agent && npx opc-agent dev\n');
  console.log('下一步: npm run demo:evolve (知识进化)\n');
}

main().catch((e) => {
  console.error(`\n[FATAL] 运行失败: ${e.message}\n`);
  process.exit(1);
});
