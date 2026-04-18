/**
 * Demo 18: Full Agent YAML — 完整配置示例
 *
 * 展示一个包含所有功能的 agent.yaml 配置
 *
 * 运行: npm run demo:full-yaml
 */

console.log('\n=== Demo 18: 完整 Agent YAML 配置 ===\n');

console.log(`# Complete OPC Agent Configuration
apiVersion: opc/v1
kind: Agent
metadata:
  name: super-agent
  version: 2.0.0
  description: Full-featured AI agent

spec:
  model: qwen2.5
  provider:
    default: ollama

  systemPrompt: |
    You are a powerful AI assistant with memory, tools, and learning capabilities.

  channels:
    - type: web
      port: 3000
    - type: telegram
      token: \${TELEGRAM_BOT_TOKEN}
      mode: polling
    - type: discord
      token: \${DISCORD_BOT_TOKEN}

  memory:
    shortTerm: true
    longTerm:
      provider: deepbrain

  skills:
    - name: echo
    - name: help

  tools:
    builtin:
      - file_operations
      - web_fetch
      - shell_exec
      - datetime

  scheduler:
    jobs:
      - name: morning-brief
        schedule: "0 9 * * *"
        task: "Generate a morning briefing"
      - name: health-check
        schedule: "*/30 * * * *"
        task: "Check all systems"

  learning:
    autoSkillCreation: true
    skillsDir: .opc/skills
    minConversationLength: 3
    improveOnUse: true`);

console.log('\n[DONE] Demo 完成!');
