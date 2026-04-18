/**
 * Demo 06: 开发者知识库 — Brain (PKM)
 *
 * DeepBrain 不只是 Agent 记忆，也是开发者的知识管理工具
 * put/get/query/list — 像 wiki 一样管理你的技术笔记
 *
 * 默认 Ollama 本地，无需 API Key
 * 前置: ollama pull nomic-embed-text
 *
 * 运行: npm run demo:brain
 */

import { Brain } from 'deepbrain';

async function checkOllama(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  console.log('\n=== Demo 06: 开发者知识库 — Brain (PKM) ===\n');
  console.log('='.repeat(50));
  console.log('\n  DeepBrain = Agent 记忆 + 开发者知识管理');
  console.log('  本 Demo 展示知识管理: put/get/query/list\n');

  // 检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';

  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('[ERROR] Ollama 未启动!');
      console.log('  Ollama not running? Run: ollama serve');
      console.log('  Then: ollama pull nomic-embed-text\n');
      process.exit(1);
    }
  }

  console.log(`>> Embedding: ${provider}\n`);

  let brain: Brain;
  try {
    brain = new Brain({
      embedding_provider: provider,
      db_path: './demo-brain-pkm.db',
    });
    await brain.connect();
    console.log('[OK] Brain 初始化成功\n');
  } catch (e: any) {
    console.error(`[ERROR] Brain 初始化失败: ${e.message}\n`);
    process.exit(1);
  }

  // 1. put — 写入知识
  console.log('='.repeat(50));
  console.log('\n>> Step 1: put() — 写入知识页面\n');

  const pages = [
    {
      slug: 'react-hooks-guide',
      title: 'React Hooks 最佳实践',
      body: `# React Hooks 最佳实践\n\n## useState\n- 管理组件内部状态\n- 复杂状态用 useReducer\n\n## useEffect\n- 处理副作用(API 调用等)\n- 空依赖 = componentDidMount\n\n## useCallback / useMemo\n- 避免不必要的重渲染\n- 配合 memo 使用效果最佳`,
    },
    {
      slug: 'docker-cheatsheet',
      title: 'Docker 常用命令速查',
      body: `# Docker 速查\n\n## 镜像\n- docker build -t name:tag .\n- docker pull image:tag\n\n## 容器\n- docker run -d -p 8080:80 image\n- docker ps / docker logs -f container\n- docker exec -it container bash\n\n## Compose\n- docker compose up -d\n- docker compose down`,
    },
    {
      slug: 'api-design-principles',
      title: 'REST API 设计原则',
      body: `# REST API 设计\n\n## URL 规范\n- 用名词复数: /users, /orders\n- 避免动词: POST /orders 而非 POST /createOrder\n\n## HTTP 方法\n- GET 查询, POST 创建, PUT 全量更新, PATCH 部分更新, DELETE 删除\n\n## 状态码\n- 200 成功, 201 已创建, 400 参数错误, 401 未认证, 404 未找到`,
    },
    {
      slug: 'git-workflow',
      title: 'Git 团队协作规范',
      body: `# Git 工作流\n\n## 分支策略\n- main: 生产, develop: 开发, feature/xxx: 功能\n\n## Commit 规范\n- feat: 新功能, fix: 修 bug, docs: 文档, refactor: 重构\n\n## Code Review\n- PR 标题包含改动概要\n- 单个 PR < 400 行\n- CI 通过才能 merge`,
    },
  ];

  for (const page of pages) {
    try {
      await brain.put(page.slug, page.body, page.title);
      console.log(`  [put] ${page.slug} — ${page.title}`);
    } catch (e: any) {
      console.error(`  [error] put 失败: ${e.message}`);
    }
  }
  console.log(`\n[OK] 写入 ${pages.length} 篇知识\n`);

  // 2. get — 读取知识
  console.log('='.repeat(50));
  console.log('\n>> Step 2: get() — 读取指定页面\n');

  try {
    const page = await brain.get('docker-cheatsheet');
    if (page) {
      console.log(`  Title: ${page.title}`);
      console.log(`  Body:  ${page.body.slice(0, 100)}...`);
      console.log(`  Chunks: ${page.chunks?.length || '?'} 个`);
    }
  } catch (e: any) {
    console.error(`  [error] get 失败: ${e.message}`);
  }
  console.log('');

  // 3. list — 列出所有页面
  console.log('='.repeat(50));
  console.log('\n>> Step 3: list() — 列出所有页面\n');

  try {
    const all = await brain.list();
    for (const p of all) {
      console.log(`  - ${p.slug} — ${p.title || '(无标题)'}`);
    }
    console.log(`\n  共 ${all.length} 篇`);
  } catch (e: any) {
    console.error(`  [error] list 失败: ${e.message}`);
  }
  console.log('');

  // 4. query — 语义搜索
  console.log('='.repeat(50));
  console.log('\n>> Step 4: query() — 语义搜索\n');

  const queries = [
    '如何优化 React 组件性能',
    '怎么查看容器日志',
    'API 返回 403 怎么处理',
    'Git 提交信息怎么写',
  ];

  for (const q of queries) {
    console.log(`  [query] "${q}"`);
    try {
      const results = await brain.query(q);
      if (results && results.length > 0) {
        const top = results[0];
        const text = top.text || top.body || JSON.stringify(top);
        console.log(`  [found] 页面: ${top.slug || top.title || '未知'}`);
        console.log(`  [match] ${text.slice(0, 80)}...`);
        if (top.score !== undefined) {
          console.log(`  [score] 匹配度: ${(top.score * 100).toFixed(0)}%`);
        }
      } else {
        console.log('  [empty] (未找到)');
      }
    } catch (e: any) {
      console.error(`  [error] 搜索失败: ${e.message}`);
    }
    console.log('');
  }

  // 总结
  console.log('='.repeat(50));
  console.log('\n>> Brain vs AgentBrain\n');
  console.log('  Brain       | 知识管理 (PKM)       | put/get/query/list');
  console.log('  AgentBrain  | Agent 经验记忆        | learn/recall/evolve');
  console.log('  两者结合    | 知识 + 经验 = 完整 DeepBrain\n');

  console.log('='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('下一步: npm run demo:model (模型推荐)\n');

  await brain.disconnect();
}

main().catch((e) => {
  console.error(`\n[FATAL] 运行失败: ${e.message}\n`);
  process.exit(1);
});
