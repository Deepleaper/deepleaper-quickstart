# ☁️ OPC Agent — Cloud API 版

使用云端 LLM API 运行的 AI Agent。支持 OpenAI、DeepSeek、通义千问等。

## 前置要求
1. Node.js 18+
2. 任意 LLM API key（OpenAI / DeepSeek / 通义千问等）

## 配置
```bash
# Option 1: OpenAI
export LLM_API_KEY=sk-xxx
export LLM_BASE_URL=https://api.openai.com/v1
export LLM_MODEL=gpt-4o-mini

# Option 2: DeepSeek (推荐，便宜)
export LLM_API_KEY=sk-xxx
export LLM_BASE_URL=https://api.deepseek.com/v1
export LLM_MODEL=deepseek-chat

# Option 3: 通义千问
export LLM_API_KEY=sk-xxx
export LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
export LLM_MODEL=qwen-turbo

# Option 4: 自定义 OpenAI 兼容 API
export LLM_API_KEY=your-key
export LLM_BASE_URL=http://your-server/v1
export LLM_MODEL=your-model
```

## 快速开始
```bash
cd e2e-cloud
npm install
npm start
```
