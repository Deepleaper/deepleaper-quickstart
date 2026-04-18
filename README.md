<div align="center">

# 🚀 Deepleaper Quickstart

**5 分钟上手跃盟开源四件套**

[![DeepBrain](https://img.shields.io/npm/v/deepbrain?label=deepbrain)](https://www.npmjs.com/package/deepbrain)
[![OPC Agent](https://img.shields.io/npm/v/opc-agent?label=opc-agent)](https://www.npmjs.com/package/opc-agent)
[![AgentKits](https://img.shields.io/npm/v/agentkits?label=agentkits)](https://www.npmjs.com/package/agentkits)
[![Agent Workstation](https://img.shields.io/npm/v/agent-workstation?label=agent-workstation)](https://www.npmjs.com/package/agent-workstation)

</div>

---

## 这是什么？

跃盟开源四件套让 AI Agent 不只能做事，还能**越做越好**：

| 项目 | 一句话 |
|------|--------|
| [DeepBrain](https://github.com/Deepleaper/deepbrain) | Agent 记忆引擎 — learn/recall/evolve + export/import |
| [OPC Agent](https://github.com/Deepleaper/opc-agent) | Agent OS — CLI TUI, daemon, cron, auto-skill, sub-agents |
| [AgentKits](https://github.com/Deepleaper/agentkits) | 带记忆的 OpenRouter — 19+ Provider + model recommend |
| [Agent Workstation](https://github.com/Deepleaper/agent-workstation) | 虚拟工位 — 100+ 角色模板 + search/validate |

## 前置条件

安装 [Ollama](https://ollama.com)（本地运行，免费）：

```bash
# 安装后拉取模型
ollama pull nomic-embed-text   # embedding 模型（274MB）
ollama pull qwen2.5            # chat 模型（Demo 2 需要）
```

## 快速开始

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart
npm install
```

### Demo 1：DeepBrain 基础 — learn/recall

```bash
npm run demo:basic
```

Agent 学习 5 条经验 → 语义检索 → 精准召回。**默认用 Ollama，无需 API Key。**

### Demo 2：DeepBrain + LLM 对话（带记忆）

```bash
npm run demo:llm
```

recall(检索记忆) → LLM(生成回复) → learn(存储经验)。**默认用 Ollama，无需 API Key。**

也支持外部 LLM：
```bash
export LLM_API_KEY=sk-xxx
export LLM_BASE_URL=http://your-api:8235
export LLM_MODEL=your-model
npm run demo:llm
```

### Demo 3：知识进化 evolve

```bash
npm run demo:evolve
```

20 条零散经验 → evolve → 提炼成精华知识。**这是 DeepBrain 的核心差异化。**

### Demo 4：OPC Agent 展示

```bash
npm run demo:agent
```

OAD 声明式配置、11 渠道支持、DeepBrain 集成。纯展示，无需任何依赖。

### Demo 5：Agent Workstation — 虚拟工位

```bash
npm run demo:workstation
```

浏览 100+ 角色模板，查看 OAD 配置 + System Prompt。**无需 API Key。**

### Demo 6：开发者知识库 — Brain (PKM)

```bash
npm run demo:brain
```

put(写入知识) → get(读取) → list(列表) → query(语义搜索)。**开发者自己的知识库。**

## 运行全部 Demo

```bash
npm run demo:all
```

### Demo 7：Model Recommendation & Cost Estimation

```bash
npm run demo:model
```

推荐最佳模型、估算 token 成本、检查 provider 健康状态。**agentkits 1.8.0 新功能。**

### Demo 8：Auto-Skill Learning (概念展示)

```bash
npm run demo:skill
```

展示 OPC Agent 1.4.0 的自主技能学习：agent 自动从对话中提炼可复用 skill。

### Demo 9：Sub-Agent 并行执行 (概念展示)

```bash
npm run demo:subagent
```

展示 OPC Agent 1.4.0 的 sub-agent 并行任务执行架构。

### Demo 10：Role Search & Validation

```bash
npm run demo:roles
```

搜索角色模板、获取热门角色、验证自定义角色配置。**agent-workstation 1.2.0 新功能。**

### Demo 11：CLI Chat — 编程式对话

```bash
npm run demo:cli-chat
```

用 BaseAgent + InMemoryStore 创建 agent，模拟多轮对话。**需要 Ollama qwen2.5。**

### Demo 12：Daemon Cron — 定时任务

```bash
npm run demo:daemon
```

Scheduler API 注册定时任务（健康检查、每日摘要）。展示 cron 调度能力。

### Demo 13：Auto-Skill Learning — 技能学习

```bash
npm run demo:auto-skill
```

SkillLearner 保存/加载/匹配技能。Agent 从对话中自动提炼可复用 skill。

### Demo 14：Sub-Agent Parallel — 并行子代理

```bash
npm run demo:parallel
```

SubAgentManager API：spawn、list、kill。展示多代理并行编排。

### Demo 15：Telegram Bot — 机器人配置

```bash
npm run demo:telegram
```

展示 Telegram bot 的 OAD YAML 配置。设置 `TELEGRAM_BOT_TOKEN` 即可运行。

### Demo 16：Built-in Tools — 内置工具

```bash
npm run demo:tools
```

列举所有内置工具（datetime、file_operations 等），并实际调用。

### Demo 17：MCP Client — 模型上下文协议

```bash
npm run demo:mcp
```

展示 MCPClient API：connect → listTools → callTool → disconnect。

### Demo 18：Full Agent YAML — 完整配置

```bash
npm run demo:full-yaml
```

一个包含所有功能的 agent.yaml：多渠道、记忆、工具、调度、学习。

### Demo 19：4-Package Integration — 四件套集成

```bash
npm run demo:integration
```

DeepBrain + OPC Agent + AgentKits + Agent Workstation 联合演示。

### Demo 20：Cost Calculator — 成本计算器

```bash
npm run demo:cost
```

对比 GPT-4o / Claude / DeepSeek / GPT-4o-mini 在不同工作负载下的 token 成本。

## 目录结构

```
examples/
├── 01-basic-brain.ts         # DeepBrain learn/recall
├── 02-brain-with-llm.ts      # DeepBrain + LLM 带记忆对话
├── 03-full-agent.ts          # OPC Agent 声明式开发
├── 04-evolve-demo.ts         # 知识进化 evolve
├── 05-workstation.ts         # Agent Workstation 虚拟工位
├── 06-developer-brain.ts     # 开发者知识库 Brain (PKM)
├── 07-model-recommend.ts     # 模型推荐 + 成本估算
├── 08-auto-skill.ts          # 自主技能学习概念
├── 09-subagent.ts            # Sub-Agent 并行执行概念
├── 10-role-search.ts         # 角色搜索 + 验证
├── 11-cli-chat.ts            # 编程式多轮对话 (NEW)
├── 12-daemon-cron.ts         # 定时任务调度 (NEW)
├── 13-auto-skill-learning.ts # 技能学习系统 (NEW)
├── 14-subagent-parallel.ts   # 并行子代理 (NEW)
├── 15-telegram-bot.ts        # Telegram 机器人 (NEW)
├── 16-built-in-tools.ts      # 内置工具 (NEW)
├── 17-mcp-client.ts          # MCP 客户端 (NEW)
├── 18-full-agent-yaml.ts     # 完整 YAML 配置 (NEW)
├── 19-brain-with-agent.ts    # 四件套集成 (NEW)
└── 20-cost-calculator.ts     # 成本计算器 (NEW)
```

## 全部本地运行

Demo 1-3 默认使用 Ollama 本地模型，Demo 4-5 无需任何服务。**全程无需 API Key，无需联网。**

也支持云端 provider：
```bash
export OPENAI_API_KEY=sk-xxx     # Demo 自动检测
export DEEPSEEK_API_KEY=sk-xxx
export GEMINI_API_KEY=xxx
```

## 下一步

- 📖 [DeepBrain 文档](https://github.com/Deepleaper/deepbrain) — Agent 记忆引擎
- 🤖 [OPC Agent 文档](https://github.com/Deepleaper/opc-agent) — Agent OS
- ⚡ [AgentKits 文档](https://github.com/Deepleaper/agentkits) — 带记忆的 OpenRouter
- 🏢 [Agent Workstation](https://github.com/Deepleaper/agent-workstation) — 100+ 角色模板

---

## English

**5-minute quickstart** for Deepleaper's open-source AI Agent suite. **All demos run locally with Ollama — no API keys needed.**

### Prerequisites

Install [Ollama](https://ollama.com), then:
```bash
ollama pull nomic-embed-text   # embedding model
ollama pull qwen2.5            # chat model (Demo 2)
```

### Run

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart && npm install

npm run demo:basic       # learn/recall — memory basics
npm run demo:llm         # recall → LLM → learn — memory-augmented chat
npm run demo:evolve      # 20 experiences → evolve → refined knowledge
npm run demo:agent       # OPC Agent showcase (OAD, channels, integration)
npm run demo:workstation # browse 100+ role templates
npm run demo:brain       # developer knowledge base (put/get/query)
npm run demo:model       # model recommendation + cost estimation (NEW)
npm run demo:skill       # auto-skill learning concept (NEW)
npm run demo:subagent    # sub-agent parallel execution concept (NEW)
npm run demo:roles       # role search + validation (NEW)
npm run demo:cli-chat    # programmatic multi-turn chat (NEW)
npm run demo:daemon      # cron/scheduled jobs (NEW)
npm run demo:auto-skill  # skill learning system (NEW)
npm run demo:parallel    # parallel sub-agents (NEW)
npm run demo:telegram    # Telegram bot config (NEW)
npm run demo:tools       # built-in tools (NEW)
npm run demo:mcp         # MCP client (NEW)
npm run demo:full-yaml   # complete agent.yaml (NEW)
npm run demo:integration # 4-package integration (NEW)
npm run demo:cost        # model cost calculator (NEW)
npm run demo:all         # run all demos
```

Cloud providers also supported: set `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, or `LLM_API_KEY` + `LLM_BASE_URL` for custom endpoints.

### Projects

| Project | What it does |
|---------|-------------|
| [DeepBrain](https://github.com/Deepleaper/deepbrain) | Agent memory engine — learn/recall/evolve + export/import |
| [OPC Agent](https://github.com/Deepleaper/opc-agent) | Agent OS — CLI TUI, daemon, cron, auto-skill, sub-agents |
| [AgentKits](https://github.com/Deepleaper/agentkits) | LLM router + memory — 19+ providers + model recommend |
| [Agent Workstation](https://github.com/Deepleaper/agent-workstation) | Virtual workstation — 100+ role templates + search/validate |

## License

Apache-2.0
