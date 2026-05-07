<div align="center">

# 🚀 Deepleaper Quickstart

### Get up and running with the Self-Evolving Agent Stack in 60 seconds

### 60 秒启动自进化智能体

[![License](https://img.shields.io/badge/License-BSL--1.1-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Website](https://img.shields.io/badge/Website-deepleaper.com-purple)](https://www.deepleaper.com)

[Website](https://www.deepleaper.com) · [Portal](https://portal.deepleaper.com)

</div>

---

## 🤔 Which Product Should I Use?

```
Do you need 100% local, zero-cloud?
├── Yes → OPC Agent 🏠
└── No
    ├── Are you in China? / 你在国内吗？
    │   ├── Yes → Leaper Agent CN 🇨🇳
    │   └── No → Leaper Agent 🌍
    └── Just need memory for your existing agent?
        └── Yes → OPC DeepBrain 🧠
```

## 📊 Product Comparison

| Feature | OPC Agent | Leaper Agent | Leaper Agent CN | OPC DeepBrain |
|---------|-----------|-------------|----------------|---------------|
| **定位** | Local-first Agent | Hermes + DeepBrain | China-optimized Agent | Standalone Memory Engine |
| **LLM** | Ollama (local) | OpenAI / Claude / Gemini | DeepSeek / 通义 / 智谱 / Moonshot | N/A (bring your own) |
| **Cloud** | None 🔒 | API keys required | API keys required | None 🔒 |
| **Cost** | $0 (your hardware) | Pay-per-token | Pay-per-token | $0 |
| **Memory** | 🧠 DeepBrain built-in | 🧠 DeepBrain built-in | 🧠 DeepBrain built-in | 🧠 Standalone |
| **Agent Orchestration** | ✅ | ✅ Hermes-compatible | ✅ | N/A |
| **Tools** | Web UI | 65+ tools (browser, terminal, vision, TTS…) | Search, Brain CLI | N/A |
| **Gateway** | ✅ | ✅ Multi-channel | ✅ Telegram | N/A |
| **MCP** | ✅ | ✅ | ❌ | N/A |
| **Templates** | ❌ | 1 (CEO Coach) | 10 CXO + 140 Industry | N/A |
| **Privacy** | 🔒🔒🔒 | 🔒 | 🔒 | 🔒🔒🔒 |
| **PyPI** | `opc-agent` | `leaper-agent` | `leaper-agent-cn` | `opc-deepbrain` |

---

## ⚡ 30-Second Quick Starts

### 🏠 OPC Agent — 100% Local, Zero Cost

```bash
pip install opc-agent
ollama pull llama3.1
opc init
opc start
# Open http://localhost:3000 in your browser
```

> Your conversations are stored locally. DeepBrain learns from every interaction. No data ever leaves your machine.

### 🌍 Leaper Agent — Hermes Base + DeepBrain Memory

```bash
pip install leaper-agent

# Set your API key (pick one)
export OPENAI_API_KEY=sk-xxx
# or: export ANTHROPIC_API_KEY=sk-ant-xxx
# or: export GEMINI_API_KEY=xxx

# Create an agent with the CEO Coach template
leaper create my-agent --template ceo-coach

# Start
leaper start my-agent
```

> Built on [Hermes Agent](https://github.com/hermes-agent) with all its tools, gateway, and MCP support. The only difference: memory that actually evolves — powered by DeepBrain's 6-layer architecture.

#### As a Telegram Bot

```bash
leaper create my-bot --template ceo-coach --bot-token YOUR_TELEGRAM_TOKEN
leaper start my-bot
```

#### What You Get (from Hermes)

- 65+ tools: browser automation, terminal, file ops, vision, TTS, image gen
- Multi-channel gateway: Telegram, Discord, WhatsApp, Web
- MCP server & client support
- Multi-agent delegation (`delegate_task`)
- Skill system with hub
- Cron jobs, ACP adapter, TUI gateway

#### What's Different (from Hermes)

- 🧠 **DeepBrain replaces flat memory** — 6-layer self-evolving knowledge with 4-Gate quality control
- Your agent remembers across sessions, consolidates patterns, and develops meta-awareness of what it knows

### 🇨🇳 Leaper Agent CN — 中国版

```bash
pip install leaper-agent-cn

# 创建 Agent（内置 10 个 CXO 角色 + 140 个行业模板）
leaper-cn create

# 启动对话
leaper-cn chat
```

> 原生支持 DeepSeek、通义千问、智谱、Moonshot。150+ 角色模板开箱即用。

### 🧠 OPC DeepBrain — Standalone Memory Engine

```python
from deepbrain import DeepBrain

brain = DeepBrain("./my_brain.db")

# Learn from any text
brain.learn("The user prefers concise answers", source="conversation")

# Search knowledge
results = brain.search("What does the user prefer?")

# Check stats
brain.stats()
```

> 3 lines. SQLite-only. Zero external dependencies. Add self-evolving memory to any agent framework.

---

## 🧠 DeepBrain: 6-Layer Memory Architecture

What makes Deepleaper agents different? **DeepBrain** — a self-evolving knowledge engine:

```
Layer 0: ⚡ Flash Memory     — Current session buffer
Layer 1: 📝 Short-Term       — Recent interactions (hours-days)
Layer 2: 📚 Long-Term        — Validated knowledge (weeks-months)
Layer 3: 🔗 Consolidated     — Cross-session patterns
Layer 4: 🗄️ Archived         — Historical reference
Layer 5: 🎯 Meta-Knowledge   — Self-awareness ("I know X well, but I'm uncertain about Y")
```

Knowledge **automatically promotes** through layers via 4-Gate quality control:
- **Relevance Gate** — Is this worth remembering?
- **Novelty Gate** — Is this genuinely new information?
- **Consistency Gate** — Does this contradict existing knowledge?
- **Utility Gate** — Will this be useful in future conversations?

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│              User / 用户                 │
├──────────┬───────────┬──────────────────┤
│ OPC Agent│ Leaper    │ Leaper Agent CN  │
│ (Ollama) │ (Hermes+) │ (DeepSeek/通义)  │
├──────────┴───────────┴──────────────────┤
│           🧠 OPC DeepBrain              │
│      6-Layer Self-Evolving Memory       │
│         4-Gate Quality Control          │
│           SQLite (100% local)           │
└─────────────────────────────────────────┘
```

## 📚 Learn More

| Product | Repo | PyPI |
|---------|------|------|
| OPC Agent | [github.com/deepleaper/opc-agent](https://github.com/deepleaper/opc-agent) | `pip install opc-agent` |
| Leaper Agent | [github.com/deepleaper/leaper-agent](https://github.com/deepleaper/leaper-agent) | `pip install leaper-agent` |
| Leaper Agent CN | [github.com/deepleaper/leaper-agent-cn](https://github.com/deepleaper/leaper-agent-cn) | `pip install leaper-agent-cn` |
| OPC DeepBrain | [github.com/deepleaper/opc-deepbrain](https://github.com/deepleaper/opc-deepbrain) | `pip install opc-deepbrain` |

## 📄 License

[BSL-1.1](LICENSE) — Free for non-competitive use. Converts to Apache-2.0 after 4 years.

## 🤝 Contributing

We welcome contributions! See each project's CONTRIBUTING.md for guidelines.

📧 Contact: [tech@deepleaper.com](mailto:tech@deepleaper.com)

---

<div align="center">

**Built with ❤️ by [Deepleaper Technology / 跃盟科技](https://www.deepleaper.com)**

*Your agent remembers. Your agent evolves. Your agent gets smarter.*

</div>
