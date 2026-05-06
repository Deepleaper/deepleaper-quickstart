<div align="center">

# 🚀 Deepleaper Quickstart

### Get up and running with the Self-Evolving Agent Stack in 60 seconds

### 60 秒上手自进化 Agent 全家桶

[![License](https://img.shields.io/badge/License-BSL--1.1-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Website](https://img.shields.io/badge/Website-deepleaper.com-purple)](https://www.deepleaper.com)

[Website](https://www.deepleaper.com) · [Portal](https://portal.deepleaper.com) · [Discord](#) · [Docs](#)

</div>

---

## 🤔 Which Product Should I Use? / 我该选哪个？

```
Do you need 100% local, zero-cloud?
├── Yes → OPC Agent 🤖
└── No
    ├── Are you in China? / 你在中国吗？
    │   ├── Yes → Leaper Agent CN 🇨🇳
    │   └── No → Leaper Agent 🚀
    └── Just need memory for my existing agent?
        └── Yes → OPC DeepBrain 🧠
```

## 📊 Product Comparison / 产品对比

| Feature | OPC Agent | Leaper Agent | Leaper Agent CN | OPC DeepBrain |
|---------|-----------|-------------|----------------|---------------|
| **定位** | Local-first Agent | Global Agent Framework | China-optimized Agent | Memory Engine |
| **LLM** | Ollama (local) | OpenAI / Claude / Gemini | 通义 / DeepSeek / 文心 | N/A (bring your own) |
| **Cloud Dependency** | None ☁️❌ | API keys required | API keys required | None ☁️❌ |
| **Cost** | $0 (your hardware) | Pay-per-token | Pay-per-token | $0 |
| **Memory** | ✅ DeepBrain built-in | ✅ DeepBrain built-in | ✅ DeepBrain built-in | ✅ Standalone |
| **Multi-Agent** | ❌ | ✅ | ✅ | N/A |
| **Telegram Bot** | ❌ | ✅ | ✅ | N/A |
| **MCP Support** | ❌ | ✅ | ✅ | N/A |
| **Privacy** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **PyPI** | `opc-agent` | `leaper-agent` | `leaper-agent-cn` | `opc-deepbrain` |

---

## ⚡ 30-Second Quick Starts

### 🤖 OPC Agent — 100% Local, Zero Cost

```bash
pip install opc-agent
ollama pull llama3.1
opc-agent init
opc-agent chat
```

> Your conversations are stored locally. DeepBrain learns from every interaction. No data ever leaves your machine.

### 🚀 Leaper Agent — Global, Multi-Provider

```bash
pip install leaper-agent
export OPENAI_API_KEY=sk-xxx    # or ANTHROPIC_API_KEY, GEMINI_API_KEY
leaper-agent init
leaper-agent chat
```

> Supports OpenAI, Claude, Gemini, and more. Switch providers with a single config change.

### 🇨🇳 Leaper Agent CN — 中国版

```bash
pip install leaper-agent-cn
export DASHSCOPE_API_KEY=sk-xxx   # 通义千问
leaper-agent-cn init
leaper-agent-cn chat
```

> 国产大模型原生支持，国内网络优化，中文文档。

### 🧠 OPC DeepBrain — Standalone Memory

```python
from opc_deepbrain import DeepBrain

brain = DeepBrain("./my_brain.db")
brain.learn("The user prefers concise answers", source="conversation")
results = brain.recall("What does the user prefer?")
```

> 3 lines. Zero dependencies. Instant long-term memory for any agent.

---

## 🧠 DeepBrain: 6-Layer Memory Architecture

What makes Deepleaper agents different? **DeepBrain** — a self-evolving knowledge engine with 6 memory layers:

```
Layer 0: ⚡ Flash Memory     — Current session buffer (minutes)
Layer 1: 📝 Short-Term       — Recent interactions (hours-days)
Layer 2: 📚 Long-Term        — Validated knowledge (weeks-months)
Layer 3: 🏗️ Consolidated     — Cross-session patterns (months)
Layer 4: 🗄️ Archived         — Historical reference (permanent)
Layer 5: 🔮 Meta-Knowledge   — Knowledge about knowledge (self-awareness)
```

Knowledge **automatically promotes** through layers based on relevance, frequency, and validation — just like human memory.

---

## 🏗️ Architecture Overview / 架构总览

```
┌──────────────────────────────────────────────────────┐
│                   User / 用户                         │
├──────────┬───────────────┬───────────────────────────┤
│ OPC Agent│  Leaper Agent │  Leaper Agent CN          │
│ (Ollama) │  (OpenAI/etc) │  (通义/DeepSeek)           │
├──────────┴───────────────┴───────────────────────────┤
│                  🧠 OPC DeepBrain                     │
│            6-Layer Self-Evolving Memory               │
│              ┌─────────────────────┐                  │
│              │   4-Gate Quality    │                  │
│              │   Control System    │                  │
│              └─────────────────────┘                  │
│                   SQLite (local)                      │
└──────────────────────────────────────────────────────┘
```

## 📚 Learn More

| Resource | Link |
|----------|------|
| OPC Agent Docs | [github.com/deepleaper/opc-agent](https://github.com/deepleaper/opc-agent) |
| Leaper Agent Docs | [github.com/deepleaper/leaper-agent](https://github.com/deepleaper/leaper-agent) |
| Leaper Agent CN Docs | [github.com/deepleaper/leaper-agent-cn](https://github.com/deepleaper/leaper-agent-cn) |
| DeepBrain Docs | [github.com/deepleaper/opc-deepbrain](https://github.com/deepleaper/opc-deepbrain) |
| Website | [www.deepleaper.com](https://www.deepleaper.com) |

## 📄 License

BSL-1.1 — see [LICENSE](LICENSE) for details.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

📧 Contact: [tech@deepleaper.com](mailto:tech@deepleaper.com)

---

<div align="center">

**Built with ❤️ by [Deepleaper Technology / 跃盟科技](https://www.deepleaper.com)**

*Your agent remembers. Your agent evolves. Your agent gets smarter.*

</div>
