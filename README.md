<div align="center">

# 🚀 Deepleaper Quickstart

**5 分钟上手跃盟开源四件套**

[![DeepBrain](https://img.shields.io/npm/v/deepbrain?label=deepbrain)](https://www.npmjs.com/package/deepbrain)
[![OPC Agent](https://img.shields.io/npm/v/opc-agent?label=opc-agent)](https://www.npmjs.com/package/opc-agent)
[![AgentKits](https://img.shields.io/npm/v/agentkits?label=agentkits)](https://www.npmjs.com/package/agentkits)

</div>

---

## 这是什么？

跃盟开源四件套让 AI Agent 不只能做事，还能**越做越好**：

| 项目 | 一句话 |
|------|--------|
| [DeepBrain](https://github.com/Deepleaper/deepbrain) | Agent 记忆引擎 — learn/recall/evolve |
| [OPC Agent](https://github.com/Deepleaper/opc-agent) | Agent OS — 全生命周期管理 |
| [AgentKits](https://github.com/Deepleaper/agentkits) | 带记忆的 OpenRouter — 19 个 LLM Provider |
| [Agent Workstation](https://github.com/Deepleaper/agent-workstation) | 虚拟工位 — 100+ 角色模板 |

## 快速开始

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart
npm install
```

### Demo 1：DeepBrain 基础（需要 API Key）

```bash
npm run demo:basic
```

Agent 学习 → 记忆 → 检索，3 个 API 搞定。

### Demo 2：DeepBrain + LLM（需要 API Key）

```bash
export OPENAI_API_KEY=sk-xxx   # 或 DEEPSEEK_API_KEY
npm run demo:llm
```

每次 LLM 调用自动 recall + learn。

### Demo 3：知识进化 evolve（需要 API Key）

```bash
npm run demo:evolve
```

看 50 条零散经验如何被提炼成 5 条精华知识。

### Demo 4：完整 Agent（需要 API Key）

```bash
npm run demo:agent
```

用 opc-agent 创建一个带记忆的完整 Agent。

## 运行全部 Demo

```bash
npm run demo:all
```

## 目录结构

```
examples/
├── 01-basic-brain.ts    # DeepBrain 单独使用
├── 02-brain-with-llm.ts # DeepBrain + AgentKits
├── 03-full-agent.ts     # OPC Agent 完整 Agent
└── 04-evolve-demo.ts    # 知识进化演示
```

## 需要 API Key 也能跑

Demo 1 和 Demo 4 不需要任何 API Key，用 DeepBrain 本地模式即可体验核心功能。

## 下一步

- 📖 [DeepBrain 文档](https://github.com/Deepleaper/deepbrain)
- 🤖 [OPC Agent 文档](https://github.com/Deepleaper/opc-agent)
- ⚡ [AgentKits 文档](https://github.com/Deepleaper/agentkits)
- 🏢 [Agent Workstation 模板](https://github.com/Deepleaper/agent-workstation)

---

## English

**5-minute quickstart** for Deepleaper's open-source AI Agent suite.

```bash
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart && npm install
npm run demo:basic   # Needs API key
npm run demo:llm     # Needs OPENAI_API_KEY
npm run demo:evolve  # Needs API key
```

Four projects: [DeepBrain](https://github.com/Deepleaper/deepbrain) (memory engine) · [OPC Agent](https://github.com/Deepleaper/opc-agent) (agent OS) · [AgentKits](https://github.com/Deepleaper/agentkits) (LLM router + memory) · [Workstation](https://github.com/Deepleaper/agent-workstation) (role templates)

## License

Apache-2.0
