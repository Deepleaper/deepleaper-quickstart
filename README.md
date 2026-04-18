<div align="center">

# 🚀 Deepleaper Quickstart

**跃盟四件套示例集：从零到生产级 Agent 的完整教程**

[![DeepBrain](https://img.shields.io/npm/v/deepbrain?label=deepbrain&color=blue)](https://www.npmjs.com/package/deepbrain)
[![OPC Agent](https://img.shields.io/npm/v/opc-agent?label=opc-agent&color=green)](https://www.npmjs.com/package/opc-agent)
[![AgentKits](https://img.shields.io/npm/v/agentkits?label=agentkits&color=orange)](https://www.npmjs.com/package/agentkits)
[![Agent Workstation](https://img.shields.io/npm/v/agent-workstation?label=agent-workstation&color=purple)](https://www.npmjs.com/package/agent-workstation)
[![License](https://img.shields.io/badge/license-Apache--2.0-brightgreen)](LICENSE)

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

---

## 前置条件

```bash
npm install -g opc-agent       # OPC Agent CLI
# 可选：安装 Ollama 用于本地 LLM（免费，无需 API Key）
# https://ollama.com
ollama pull nomic-embed-text   # embedding 模型（274MB）
ollama pull qwen2.5            # chat 模型（Demo 02 需要）
```

---

## 快速开始

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart
npm install
```

---

## Demo 目录（学习路径，由浅入深）

| # | Demo | 难度 | 学习目标 | 运行命令 |
|---|------|------|---------|----------|
| 01 | [basic-brain](#01-basic-brain) | ⭐ | DeepBrain 基础：put/get/query | `npm run demo:basic` |
| 02 | [brain-with-llm](#02-brain-with-llm) | ⭐⭐ | Brain + LLM 语义搜索 | `npm run demo:llm` |
| 03 | [full-agent](#03-full-agent) | ⭐⭐ | 完整 Agent 创建和对话 | `npm run demo:agent` |
| 04 | [evolve-demo](#04-evolve-demo) | ⭐⭐⭐ | 知识自动进化 | `npm run demo:evolve` |
| 05 | [workstation](#05-workstation) | ⭐⭐ | 工位模板使用 | `npm run demo:workstation` |
| 06 | [developer-brain](#06-developer-brain) | ⭐⭐⭐ | 开发者专属 Brain | `npm run demo:brain` |
| 07 | [model-recommend](#07-model-recommend) | ⭐⭐ | 智能模型推荐 | `npm run demo:model` |
| 08 | [auto-skill](#08-auto-skill) | ⭐⭐⭐ | Skill 自动学习 | `npm run demo:skill` |
| 09 | [subagent](#09-subagent) | ⭐⭐⭐ | 多 Agent 协作 | `npm run demo:subagent` |
| 10 | [role-search](#10-role-search) | ⭐ | 角色搜索和浏览 | `npm run demo:roles` |
| e2e-local | [端到端(本地)](#e2e-local-端到端本地) | ⭐⭐⭐⭐ | Ollama 全本地完整流程 | `cd e2e-local && npm start` |
| e2e-cloud | [端到端(云端)](#e2e-cloud-端到端云端) | ⭐⭐⭐⭐ | Cloud API 完整流程 | `cd e2e-cloud && npm start` |

---

## 推荐学习路线

| 路线 | 适合人群 | 路径 |
|------|---------|------|
| 🟢 新手入门 | 第一次接触 Agent 开发 | 01 → 03 → 05 → 10 |
| 🟡 进阶探索 | 想深入理解记忆与进化 | 02 → 04 → 07 → 08 |
| 🔴 全栈实战 | 要搭建完整 Agent 系统 | e2e-local 或 e2e-cloud |

---

## Demo 详解

### 01 basic-brain

**DeepBrain 基础：学习经验 → 语义检索 → 精准召回**

```bash
npm run demo:basic
```

预期输出：
```
🧠 DeepBrain 基础 Demo - learn / recall
✅ Brain 初始化成功
📝 Agent 学习了 5 条经验
🔍 查询: "如何处理客户投诉" → 召回相关经验，匹配度 85%+
```

### 02 brain-with-llm

**Brain + LLM 联动：recall(检索) → LLM(生成) → learn(存储)**

```bash
npm run demo:llm
```

需要 Ollama qwen2.5 或设置 `LLM_API_KEY`。

预期输出：
```
🤖 Embedding: ollama | Chat: Ollama (qwen2.5)
📚 知识库已加载
💬 用户提问 → recall 3 条相关记忆 → LLM 生成回复 → learn 新经验
```

### 03 full-agent

**OPC Agent 声明式配置展示：OAD 规范 + 11 渠道 + DeepBrain 集成**

```bash
npm run demo:agent
```

纯展示，无需 Ollama 或 API Key。

预期输出：
```
🤖 OPC Agent Demo - Agent OS
📋 CLI 命令一览 | 📝 OAD 配置示例 | 📡 11 个渠道支持
```

### 04 evolve-demo

**知识自动进化：20 条零散经验 → evolve → 提炼成精华知识**

```bash
npm run demo:evolve
```

这是 DeepBrain 的**核心差异化能力**。

预期输出：
```
🧬 知识进化 Demo - evolve
📝 学习 20 条零散经验...
🔄 执行知识进化 (evolve)...
✅ 处理: 20 条 → 精炼: 4 条结构化知识
```

### 05 workstation

**浏览 100+ 角色模板，查看 OAD 配置 + System Prompt**

```bash
npm run demo:workstation
```

无需 API Key。

预期输出：
```
🏢 Agent Workstation Demo
📂 浏览 10+ 分类, 100+ 角色模板
📋 示例角色: frontend-developer, seo-specialist, data-analyst
```

### 06 developer-brain

**开发者知识库：put(写入) → get(读取) → list(列表) → query(语义搜索)**

```bash
npm run demo:brain
```

预期输出：
```
📖 开发者知识库 Demo
✍️ 写入 4 篇知识 (React Hooks, Docker, REST API, Git)
🔍 语义搜索: "如何优化 React 性能" → 匹配到 React Hooks 指南
```

### 07 model-recommend

**智能模型推荐 + token 成本估算 + Provider 健康检查**

```bash
npm run demo:model
```

无需 API Key（推荐和估价功能）。

预期输出：
```
🎯 推荐 chat 模型 (免费/本地): ollama/qwen2.5
💰 gpt-4o 成本估算: 1000 input + 500 output = $0.0075
🏥 Ollama provider: healthy
```

### 08 auto-skill

**OPC Agent 自主技能学习概念展示**

```bash
npm run demo:skill
```

纯概念展示，展示 Agent 如何从对话中自动提炼可复用 Skill。

### 09 subagent

**多 Agent 协作：主 Agent 分发子任务，并行执行后汇总结果**

```bash
npm run demo:subagent
```

纯概念展示，展示 Sub-Agent 并行执行架构。

### 10 role-search

**角色搜索 + 验证：搜索角色模板、获取热门角色、校验自定义配置**

```bash
npm run demo:roles
```

无需 API Key。

预期输出：
```
🔍 搜索 "developer" → 5 个匹配角色
⭐ 热门角色: fullstack, data-analyst, product-manager...
✅ 自定义角色验证通过
```

### e2e-local 端到端(本地)

**Ollama 全本地完整流程：多轮对话 + 记忆 + 技能 + 知识进化，零成本零网络**

```bash
cd e2e-local && npm install && npm start
```

需要 Ollama + qwen2.5:3b 模型。

### e2e-cloud 端到端(云端)

**Cloud API 完整流程：支持 OpenAI / DeepSeek / 通义千问等**

```bash
export LLM_API_KEY=sk-xxx
cd e2e-cloud && npm install && npm start
```

---

## 更多 Demo（进阶）

| Demo | 说明 | 运行命令 |
|------|------|----------|
| 11-cli-chat | 编程式多轮对话 | `npm run demo:cli-chat` |
| 12-daemon-cron | 定时任务调度 | `npm run demo:daemon` |
| 13-auto-skill-learning | 技能学习系统 | `npm run demo:auto-skill` |
| 14-subagent-parallel | 并行子代理 | `npm run demo:parallel` |
| 15-telegram-bot | Telegram 机器人 | `npm run demo:telegram` |
| 16-built-in-tools | 内置工具 | `npm run demo:tools` |
| 17-mcp-client | MCP 客户端 | `npm run demo:mcp` |
| 18-full-agent-yaml | 完整 YAML 配置 | `npm run demo:full-yaml` |
| 19-brain-with-agent | 四件套集成 | `npm run demo:integration` |
| 20-cost-calculator | 成本计算器 | `npm run demo:cost` |

---

## 全部本地运行

Demo 01-06 默认使用 Ollama 本地模型。Demo 03、05、07-10 无需任何服务。

也支持云端 Provider：
```bash
export OPENAI_API_KEY=sk-xxx
export DEEPSEEK_API_KEY=sk-xxx
export GEMINI_API_KEY=xxx
```

运行全部核心 Demo：
```bash
npm run demo:all
```

---

## 目录结构

```
examples/
├── 01-basic-brain.ts         ⭐   DeepBrain learn/recall
├── 02-brain-with-llm.ts      ⭐⭐  Brain + LLM 带记忆对话
├── 03-full-agent.ts          ⭐⭐  OPC Agent 声明式开发
├── 04-evolve-demo.ts         ⭐⭐⭐ 知识进化 evolve
├── 05-workstation.ts         ⭐⭐  Agent Workstation 虚拟工位
├── 06-developer-brain.ts     ⭐⭐⭐ 开发者知识库 Brain
├── 07-model-recommend.ts     ⭐⭐  模型推荐 + 成本估算
├── 08-auto-skill.ts          ⭐⭐⭐ 自主技能学习
├── 09-subagent.ts            ⭐⭐⭐ 多 Agent 协作
├── 10-role-search.ts         ⭐   角色搜索 + 验证
├── 11~20                     进阶 Demo（CLI/Cron/MCP/集成等）
e2e-local/                    ⭐⭐⭐⭐ Ollama 全本地端到端
e2e-cloud/                    ⭐⭐⭐⭐ Cloud API 端到端
```

---

## 下一步

- 📖 [DeepBrain 文档](https://github.com/Deepleaper/deepbrain) — Agent 记忆引擎
- 🤖 [OPC Agent 文档](https://github.com/Deepleaper/opc-agent) — Agent OS
- ⚡ [AgentKits 文档](https://github.com/Deepleaper/agentkits) — 带记忆的 OpenRouter
- 🏢 [Agent Workstation](https://github.com/Deepleaper/agent-workstation) — 100+ 角色模板

---

<details>
<summary><h2>🌍 English Version</h2></summary>

# 🚀 Deepleaper Quickstart

**Complete tutorial collection: from zero to production-grade AI Agent**

## What is this?

Deepleaper's open-source suite makes AI Agents that **get better over time**:

| Project | One-liner |
|---------|-----------|
| [DeepBrain](https://github.com/Deepleaper/deepbrain) | Agent memory engine — learn/recall/evolve + export/import |
| [OPC Agent](https://github.com/Deepleaper/opc-agent) | Agent OS — CLI TUI, daemon, cron, auto-skill, sub-agents |
| [AgentKits](https://github.com/Deepleaper/agentkits) | LLM router + memory — 19+ providers + model recommend |
| [Agent Workstation](https://github.com/Deepleaper/agent-workstation) | Virtual workstation — 100+ role templates + search/validate |

## Prerequisites

```bash
npm install -g opc-agent       # OPC Agent CLI
# Optional: Ollama for local LLM (free, no API key needed)
# https://ollama.com
ollama pull nomic-embed-text   # embedding model (274MB)
ollama pull qwen2.5            # chat model (Demo 02)
```

## Quick Start

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart
npm install
```

## Demo Directory (Progressive Learning Path)

| # | Demo | Difficulty | Learning Goal | Command |
|---|------|-----------|---------------|---------|
| 01 | basic-brain | ⭐ | DeepBrain basics: put/get/query | `npm run demo:basic` |
| 02 | brain-with-llm | ⭐⭐ | Brain + LLM semantic search | `npm run demo:llm` |
| 03 | full-agent | ⭐⭐ | Complete Agent creation & chat | `npm run demo:agent` |
| 04 | evolve-demo | ⭐⭐⭐ | Auto knowledge evolution | `npm run demo:evolve` |
| 05 | workstation | ⭐⭐ | Workstation role templates | `npm run demo:workstation` |
| 06 | developer-brain | ⭐⭐⭐ | Developer knowledge base | `npm run demo:brain` |
| 07 | model-recommend | ⭐⭐ | Smart model recommendation | `npm run demo:model` |
| 08 | auto-skill | ⭐⭐⭐ | Auto skill learning | `npm run demo:skill` |
| 09 | subagent | ⭐⭐⭐ | Multi-agent collaboration | `npm run demo:subagent` |
| 10 | role-search | ⭐ | Role search & browse | `npm run demo:roles` |
| e2e-local | End-to-end (local) | ⭐⭐⭐⭐ | Full Ollama local pipeline | `cd e2e-local && npm start` |
| e2e-cloud | End-to-end (cloud) | ⭐⭐⭐⭐ | Full Cloud API pipeline | `cd e2e-cloud && npm start` |

## Recommended Learning Paths

| Path | For | Route |
|------|-----|-------|
| 🟢 Beginner | First time with Agent dev | 01 → 03 → 05 → 10 |
| 🟡 Intermediate | Deeper memory & evolution | 02 → 04 → 07 → 08 |
| 🔴 Full-stack | Building complete Agent systems | e2e-local or e2e-cloud |

## Run All Core Demos

```bash
npm run demo:all
```

## Cloud Providers

```bash
export OPENAI_API_KEY=sk-xxx
export DEEPSEEK_API_KEY=sk-xxx
export GEMINI_API_KEY=xxx
```

## Additional Demos (11-20)

```bash
npm run demo:cli-chat    # Programmatic multi-turn chat
npm run demo:daemon      # Cron/scheduled jobs
npm run demo:auto-skill  # Skill learning system
npm run demo:parallel    # Parallel sub-agents
npm run demo:telegram    # Telegram bot config
npm run demo:tools       # Built-in tools
npm run demo:mcp         # MCP client
npm run demo:full-yaml   # Complete agent.yaml
npm run demo:integration # 4-package integration
npm run demo:cost        # Model cost calculator
```

## License

Apache-2.0

</details>
