// Show how to create a Telegram bot agent
import { AgentRuntime } from 'opc-agent';

// This is what your agent.yaml would look like:
const config = `
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
    - name: echo
`;

console.log('Telegram Bot Agent Config:');
console.log(config);
console.log('To run: set TELEGRAM_BOT_TOKEN env var, then `opc run`');
