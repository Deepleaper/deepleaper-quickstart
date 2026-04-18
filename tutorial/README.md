# 🤖 End-to-End Tutorial: Customer Service Agent with Memory

**构建一个有记忆的客服 Agent — 使用全部 4 个 Deepleaper 开源包**

This tutorial walks you through building a **real working agent** that combines all 4 Deepleaper open-source packages into one project. By the end, you'll have a customer service agent that can:

- 💬 Chat via a web UI (powered by **opc-agent**)
- 🧠 Remember past interactions (powered by **deepbrain**)
- 🔧 Handle order lookups and FAQs via skills
- 🎭 Use role templates (from **agent-workstation**)
- 🤝 Use multi-provider LLM/embedding (via **agentkits**)

## Architecture 架构

```
agent-workstation ──→ Role templates & knowledge seeding
       │
opc-agent ──→ Runtime, Web UI, OAD config, Skill framework
       │              │
  agentkits      deepbrain
  (LLM &         (PGLite embedded DB
   embedding      + semantic search
   providers)     + agent memory)
```

**How they connect:**
1. **deepbrain** uses **agentkits** internally for embedding (e.g., `ollama/nomic-embed-text`)
2. **opc-agent** provides the runtime that loads config, binds channels, registers skills
3. **agent-workstation** provides role templates you can browse/use
4. Your code ties them all together in `src/index.ts`

## Prerequisites 前置条件

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **Ollama** — [ollama.com](https://ollama.com) with these models:
  ```bash
  ollama pull nomic-embed-text   # For embeddings (used by deepbrain via agentkits)
  ollama pull qwen2.5            # For chat (used by opc-agent)
  ```

## Quick Start 快速开始

```bash
# 1. Clone the repo
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart/tutorial/customer-service-agent

# 2. Install dependencies
npm install

# 3. Make sure Ollama is running
ollama serve  # (in another terminal)

# 4. Start the agent!
npm start
# (uses: node --import tsx/esm src/index.ts)
```

Open http://localhost:3000 and start chatting!

## Project Structure 项目结构

```
customer-service-agent/
├── agent.yaml           # OAD config — declares agent behavior
├── src/
│   ├── index.ts         # Main entry — ties all 4 packages together
│   └── skills/
│       ├── order-lookup.ts  # Skill: look up orders by ID
│       └── faq.ts           # Skill: answer FAQs from DeepBrain memory
├── package.json
└── tsconfig.json
```

## How It Works 工作原理

### 1. `agent.yaml` — OAD (Open Agent Definition)

OAD is opc-agent's declarative config format. It defines:
- **model & provider** — Which LLM to use (qwen2.5 via Ollama)
- **channels** — How users interact (web UI on port 3000)
- **memory** — Short-term (in-memory) + long-term (DeepBrain)
- **skills** — What the agent can do beyond chat

### 2. `src/index.ts` — The Glue

This is where all 4 packages meet:

```typescript
// deepbrain: Create persistent memory
const brain = new Brain({ database: './agent-brain-data', embedding_provider: 'ollama' });
const agentBrain = new AgentBrain(brain, 'customer-service');

// agent-workstation: Browse available role templates
const categories = getCategories();

// deepbrain + agentkits: Seed knowledge (embedding happens automatically)
await agentBrain.learn({ action: 'Return policy', result: '7-day return...' });

// opc-agent: Load config, initialize runtime, register skills, start
const runtime = new AgentRuntime();
await runtime.loadConfig('./agent.yaml');
await runtime.initialize();
runtime.registerSkill(new OrderLookupSkill());
runtime.registerSkill(new FAQSkill(agentBrain));
await runtime.start();
```

### 3. Skills — Pattern Matching + Memory

**OrderLookupSkill**: Matches `ORD-XXXXX` patterns, returns mock order data.

**FAQSkill**: 
1. Checks if the message contains FAQ keywords
2. Calls `agentBrain.recall(message)` — semantic search via DeepBrain
3. If a good match is found (score > 0.5), returns it
4. Also calls `agentBrain.learn()` to record the interaction
5. If no match, falls through to the LLM

### 4. Memory Flow

```
User asks "What's your return policy?"
  → FAQSkill detects "return" keyword
  → agentBrain.recall("What's your return policy?")
  → DeepBrain embeds query via agentkits (Ollama nomic-embed-text)
  → Semantic search finds "Return policy" page
  → Returns the answer from memory
  → Also learns this interaction for future reference
```

## Try These 试试这些

| Input | What Happens |
|-------|-------------|
| "What is your return policy?" | FAQ skill → DeepBrain recall → returns stored knowledge |
| "Check order ORD-12345" | Order skill → pattern match → returns order details |
| "How can I pay?" | FAQ skill → DeepBrain recall → payment methods |
| "Tell me a joke" | No skill matches → falls through to LLM (qwen2.5) |

## What's Next 下一步

1. **Add more skills** — Create new classes extending `BaseSkill`
2. **Add more knowledge** — Call `agentBrain.learn()` with your domain data
3. **Use `agentBrain.evolve()`** — Consolidate traces into refined knowledge over time
4. **Add Telegram channel** — Add a telegram channel config to `agent.yaml`
5. **Try different models** — Change `spec.model` in `agent.yaml`
6. **Use role templates** — Call `getRole('customer-service', 'support')` from agent-workstation
7. **Add agentkits features** — Use `createChat()`, `createRAG()`, tool calling, etc.
8. **Model recommendation** — Use `recommendModel()` to find the best model for your task
9. **Cost estimation** — Use `estimateModelCost()` before committing to a model
10. **Search roles** — Use `searchRoles()` and `getPopularRoles()` to discover templates

## Environment Variables 环境变量

| Variable | Default | Description |
|----------|---------|-------------|
| `OPC_LLM_BASE_URL` | `http://localhost:11434/v1` | LLM endpoint (Ollama default) |
| `OPC_LLM_API_KEY` | `ollama` | API key for LLM provider |

## Package Versions

| Package | Version | Role |
|---------|---------|------|
| `deepbrain` | 1.9.x | Brain + AgentBrain — persistent semantic memory + export/import |
| `opc-agent` | 1.4.x | Agent runtime, CLI TUI, daemon, cron, auto-skill, sub-agents |
| `agentkits` | 1.8.x | Multi-provider LLM & embedding + model recommend + cost estimation |
| `agent-workstation` | 1.2.x | Role templates, search, validation |

## License

MIT — See [LICENSE](../../LICENSE)
