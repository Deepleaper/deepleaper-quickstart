/**
 * Demo 6: 开发者知识库 — Brain (PKM)
 * 
 * DeepBrain 不只是 Agent 记忆，也是开发者自己的知识库。
 * put/get/query/list — 存储、检索、管理你的知识。
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
  } catch { return false; }
}

async function main() {
  console.log('📚 开发者知识库 Demo — Brain (PKM)\n');
  console.log('━'.repeat(50));
  console.log('\n  DeepBrain = Agent 记忆 + 开发者知识库');
  console.log('  这个 Demo 展示开发者侧：put/get/query/list\n');

  // 检测 provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY) provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';

  if (provider === 'ollama') {
    const ok = await checkOllama();
    if (!ok) {
      console.log('❌ Ollama 未启动！');
      console.log('请先: ollama serve && ollama pull nomic-embed-text\n');
      process.exit(1);
    }
  }

  console.log(`📦 Embedding: ${provider}\n`);

  let brain: Brain;
  try {
    brain = new Brain({
      embedding_provider: provider,
      db_path: './demo-brain-pkm.db'
    });
    await brain.connect();
    console.log('✅ Brain 初始化完成\n');
  } catch (e: any) {
    console.error(`❌ Brain 初始化失败: ${e.message}\n`);
    process.exit(1);
  }

  // 1. put — 写入知识
  console.log('━'.repeat(50));
  console.log('\n📝 Step 1: put() — 写入知识页面\n');

  const pages = [
    {
      slug: 'react-hooks-guide',
      title: 'React Hooks 最佳实践',
      body: `# React Hooks 最佳实践

## useState
- 用于简单状态管理
- 避免在循环/条件中使用
- 复杂状态用 useReducer

## useEffect
- 依赖数组务必完整
- 清理函数防止内存泄漏
- 空数组 = componentDidMount

## useCallback / useMemo
- 不要过度使用，有性能成本
- 只在子组件 memo 或计算量大时使用
- React Compiler 会自动优化（React 19+）

## 自定义 Hook
- 以 use 开头命名
- 抽取重复逻辑
- 示例: useDebounce, useFetch, useLocalStorage`
    },
    {
      slug: 'docker-cheatsheet',
      title: 'Docker 常用命令速查',
      body: `# Docker 常用命令

## 镜像管理
- docker build -t name:tag .
- docker pull image:tag
- docker images / docker rmi

## 容器操作
- docker run -d -p 8080:80 image
- docker ps / docker ps -a
- docker stop/start/restart container
- docker exec -it container bash
- docker logs -f container

## Docker Compose
- docker compose up -d
- docker compose down
- docker compose logs -f service

## 优化技巧
- 多阶段构建减小镜像体积
- .dockerignore 排除不需要的文件
- 合并 RUN 层减少 layer 数量`
    },
    {
      slug: 'api-design-principles',
      title: 'REST API 设计原则',
      body: `# REST API 设计原则

## URL 设计
- 名词复数: /users, /orders
- 嵌套资源: /users/123/orders
- 避免动词: 用 POST /orders 而非 POST /createOrder

## HTTP 方法
- GET: 查询（幂等）
- POST: 创建
- PUT: 全量更新（幂等）
- PATCH: 部分更新
- DELETE: 删除（幂等）

## 状态码
- 200 成功, 201 创建成功, 204 无内容
- 400 参数错误, 401 未认证, 403 无权限, 404 不存在
- 500 服务器错误

## 分页
- 游标分页: ?cursor=xxx&limit=20
- 偏移分页: ?page=1&size=20（大数据集慢）

## 版本控制
- URL 版本: /v1/users
- Header 版本: Accept: application/vnd.api.v1+json`
    },
    {
      slug: 'git-workflow',
      title: 'Git 团队协作流程',
      body: `# Git 团队协作流程

## 分支策略
- main: 生产分支，永远可部署
- develop: 开发分支
- feature/xxx: 功能分支
- hotfix/xxx: 紧急修复

## Commit 规范
- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- refactor: 重构
- test: 测试
- chore: 构建/工具

## Code Review
- PR 描述清楚改了什么、为什么改
- 每个 PR < 400 行
- CI 通过才能 merge
- Squash merge 保持历史整洁`
    },
  ];

  for (const page of pages) {
    try {
      await brain.put(page.slug, page.body, page.title);
      console.log(`  📄 ${page.slug} — ${page.title}`);
    } catch (e: any) {
      console.error(`  ❌ put 失败: ${e.message}`);
    }
  }
  console.log(`\n✅ 写入 ${pages.length} 个知识页面\n`);

  // 2. get — 读取知识
  console.log('━'.repeat(50));
  console.log('\n📖 Step 2: get() — 读取知识页面\n');

  try {
    const page = await brain.get('docker-cheatsheet');
    if (page) {
      console.log(`  标题: ${page.title}`);
      console.log(`  内容: ${page.body.slice(0, 100)}...`);
      console.log(`  分块: ${page.chunks?.length || '?'} 个`);
    }
  } catch (e: any) {
    console.error(`  ❌ get 失败: ${e.message}`);
  }
  console.log('');

  // 3. list — 列出所有页面
  console.log('━'.repeat(50));
  console.log('\n📋 Step 3: list() — 列出所有知识\n');

  try {
    const all = await brain.list();
    for (const p of all) {
      console.log(`  📄 ${p.slug} — ${p.title || '(无标题)'}`);
    }
    console.log(`\n  共 ${all.length} 个页面`);
  } catch (e: any) {
    console.error(`  ❌ list 失败: ${e.message}`);
  }
  console.log('');

  // 4. query — 语义搜索
  console.log('━'.repeat(50));
  console.log('\n🔍 Step 4: query() — 语义搜索\n');

  const queries = [
    '怎么管理 React 组件状态？',
    '容器怎么查看日志？',
    'API 返回 403 是什么意思？',
    'Git 提交信息怎么写？',
  ];

  for (const q of queries) {
    console.log(`  ❓ "${q}"`);
    try {
      const results = await brain.query(q);
      if (results && results.length > 0) {
        const top = results[0];
        const text = top.text || top.body || JSON.stringify(top);
        console.log(`  💡 来自: ${top.slug || top.title || '未知'}`);
        console.log(`  📝 ${text.slice(0, 80)}...`);
        if (top.score !== undefined) {
          console.log(`  📊 相关度: ${(top.score * 100).toFixed(0)}%`);
        }
      } else {
        console.log(`  (未找到)`);
      }
    } catch (e: any) {
      console.error(`  ❌ 搜索失败: ${e.message}`);
    }
    console.log('');
  }

  // 5. 对比
  console.log('━'.repeat(50));
  console.log('\n🆚 Brain vs AgentBrain\n');
  console.log('  ┌──────────────┬───────────────────────────┐');
  console.log('  │   Brain      │  开发者知识库 (PKM)       │');
  console.log('  │   (本 Demo)  │  put/get/query/list       │');
  console.log('  │              │  存文档、搜知识           │');
  console.log('  ├──────────────┼───────────────────────────┤');
  console.log('  │  AgentBrain  │  Agent 记忆引擎           │');
  console.log('  │  (Demo 1)    │  learn/recall/evolve      │');
  console.log('  │              │  存经验、检索、进化       │');
  console.log('  ├──────────────┼───────────────────────────┤');
  console.log('  │  共享底层    │  同一个 Brain 实例        │');
  console.log('  │              │  同一个向量数据库         │');
  console.log('  └──────────────┴───────────────────────────┘\n');
  console.log('  开发者知识 + Agent 经验 = 完整的 DeepBrain\n');

  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log('  DeepBrain = 个人知识库 + Agent 记忆引擎');
  console.log('  两者共享同一个大脑，互相增强。\n');
  console.log('  文档: https://github.com/Deepleaper/deepbrain\n');

  await brain.disconnect();
}

main().catch(e => {
  console.error(`\n💥 未预期错误: ${e.message}\n`);
  process.exit(1);
});
