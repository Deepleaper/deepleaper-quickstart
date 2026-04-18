/**
 * Demo 15: Telegram Bot — 机器人配置
 *
 * 展示 Telegram bot 的 OAD YAML 配置
 * 设置 TELEGRAM_BOT_TOKEN 即可运行
 *
 * 运行: npm run demo:telegram
 */


console.log('\n=== Demo 15: Telegram Bot 配置 ===\n');

const config = `# agent.yaml — Telegram Bot Agent
apiVersion: opc/v1
kind: Agent
metadata:
  name: my-telegram-bot
spec:
  model: qwen2.5
  provider:
    default: ollama
  systemPrompt: |
    You are a helpful Telegram bot.
  channels:
    - type: telegram
      token: \${TELEGRAM_BOT_TOKEN}
      mode: polling
  skills:
    - name: echo`;

console.log(config);
console.log('\nTo run:');
console.log('  1. Set TELEGRAM_BOT_TOKEN env var');
console.log('  2. opc run');

console.log('\n[DONE] Demo 完成!');
