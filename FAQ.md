# ❓ 常见问题 / FAQ

遇到问题？在这里找答案。如果没有解决，欢迎 [提 Issue](https://github.com/Deepleaper/deepleaper-quickstart/issues)。

---

## Q1: `TypeError: Cannot read properties of undefined (reading 'keyEnv')`

**原因:** agentkits 版本过旧，缺少 provider 防御逻辑。

**解决:**
```bash
npm update
# 或彻底重装
rm -rf node_modules package-lock.json && npm install
```

---

## Q2: `AuthenticationError: Missing API key for provider "none"`

**原因:** demo 文件中 `embedding_provider` 设为 `'none'`（旧版代码残留）。

**解决:**
```bash
git pull   # 拉取最新代码
# 如果 git pull 报冲突，重新 clone：
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
```

---

## Q3: `ERR_PACKAGE_PATH_NOT_EXPORTED` for agentkits

**原因:** agentkits exports 缺少 `default` 条件（已在 1.10.2 修复）。

**解决:**
```bash
npm update
```

---

## Q4: Ollama 未安装或未启动

**现象:** `demo:basic` 提示 "Ollama 未启动"。

**解决:**
```bash
# macOS
brew install ollama
ollama serve          # 启动服务（另开终端）
ollama pull nomic-embed-text  # 拉取 embedding 模型

# Windows / Linux: 从 https://ollama.com 下载安装
# 启动后同样运行 ollama pull nomic-embed-text

# 或者不用 Ollama，直接用 API key 代替：
export OPENAI_API_KEY=sk-xxx
```

---

## Q5: PGLite WASM 在 Node 24 崩溃

**现象:** Brain 初始化时出现 WASM 相关错误。

**解决:** 使用 Node 22 LTS：
```bash
nvm use 22
```

---

## Q6: 嵌套目录问题 (`deepleaper-quickstart/deepleaper-quickstart/`)

**原因:** 在 repo 目录内重复执行了 `git clone`。

**解决:**
```bash
cd ~
rm -rf deepleaper-quickstart
git clone https://github.com/Deepleaper/deepleaper-quickstart.git
cd deepleaper-quickstart
npm install
```

---

## Q7: 如何切换 embedding provider?

支持: **ollama** (默认/免费), **openai**, **gemini**, **deepseek**, **dashscope**

设置对应环境变量即可自动检测：
```bash
export OPENAI_API_KEY=sk-xxx     # 用 OpenAI
export GEMINI_API_KEY=xxx        # 用 Gemini
export DEEPSEEK_API_KEY=xxx      # 用 DeepSeek
export DASHSCOPE_API_KEY=xxx     # 用通义千问
```

不设置任何 key 时，默认使用本地 Ollama（需先安装并启动）。

---

## Q8: 如何配置 LLM 用于 demo:llm 和 demo:agent?

设置环境变量：
```bash
export LLM_API_KEY=xxx
export LLM_BASE_URL=https://api.openai.com/v1
export LLM_MODEL=gpt-4o
```

---

## Q9: `npm install` 报错 ERESOLVE

**解决:**
```bash
npm install --legacy-peer-deps
```

---

## Q10: Windows 上运行 demo 乱码

**解决:** 切换终端编码为 UTF-8：
```powershell
chcp 65001
```

---

> 💡 **通用排障三板斧:**
> 1. `rm -rf node_modules package-lock.json && npm install` — 重装依赖
> 2. `ollama serve` — 确保 Ollama 在运行（另开终端）
> 3. `nvm use 22` — 确保 Node 版本为 22 LTS
