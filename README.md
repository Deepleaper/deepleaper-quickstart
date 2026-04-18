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

## 目录结构

```
examples/
├── 01-basic-brain.ts      # DeepBrain learn/recall
├── 02-brain-with-llm.ts   # DeepBrain + LLM 带记忆对话
├── 03-full-agent.ts       # OPC Agent 声明式开发
├── 04-evolve-demo.ts      # 知识进化 evolve
├── 05-workstation.ts      # Agent Workstation 虚拟工位
├── 06-developer-brain.ts  # 开发者知识库 Brain (PKM)
├── 07-model-recommend.ts  # 模型推荐 + 成本估算 (NEW)
├── 08-auto-skill.ts       # 自主技能学习概念 (NEW)
├── 09-subagent.ts         # Sub-Agent 并行执行概念 (NEW)
└── 10-role-search.ts      # 角色搜索 + 验证 (NEW)
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
