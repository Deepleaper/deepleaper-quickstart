/**
 * Demo 05: Agent Workstation — 虚拟工位模板
 *
 * 浏览 100+ 角色模板，查看 OAD 配置 + System Prompt
 * 无需 API Key，无需 Ollama
 *
 * 运行: npm run demo:workstation
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { getCategories, getRole } = require('agent-workstation');

function main() {
  console.log('\n=== Demo 05: Agent Workstation — 虚拟工位 ===\n');
  console.log('='.repeat(50));

  // 1. 浏览所有角色分类
  console.log('\n>> Step 1: 角色分类一览\n');

  const categories = getCategories();
  let totalRoles = 0;

  for (const cat of categories) {
    console.log(`  [${cat.name}] (${cat.roles.length} 个角色)`);
    for (const role of cat.roles.slice(0, 3)) {
      console.log(`    - ${role}`);
    }
    if (cat.roles.length > 3) {
      console.log(`    - ... 还有 ${cat.roles.length - 3} 个`);
    }
    totalRoles += cat.roles.length;
  }
  console.log(`\n  共 ${categories.length} 个分类, ${totalRoles} 个角色模板\n`);

  // 2. 查看具体角色
  console.log('='.repeat(50));
  console.log('\n>> Step 2: 查看角色详情\n');

  const examples: [string, string][] = [
    ['engineering', 'frontend-developer'],
    ['marketing', 'seo-specialist'],
    ['data', 'data-analyst'],
  ];

  for (const [category, roleName] of examples) {
    const role = getRole(category, roleName);
    if (!role) {
      console.log(`  [NOT FOUND] ${category}/${roleName}`);
      continue;
    }

    console.log(`  [${category}/${roleName}]`);

    // 文件列表
    const fileNames = Object.keys(role.files).filter((f: string) => !f.endsWith('/'));
    console.log(`    Files: ${fileNames.join(', ')}`);

    // OAD 配置预览
    const oad = role.files['oad.yaml'];
    if (oad) {
      const titleMatch = oad.match(/en:\s*"([^"]+)"/);
      if (titleMatch) console.log(`    Title: ${titleMatch[1]}`);
    }

    // System Prompt 预览
    const systemPrompt = role.files['system.md'];
    if (systemPrompt) {
      const firstContent = systemPrompt.split('\n').find((l: string) => l.startsWith('You are'));
      if (firstContent) console.log(`    Prompt: ${firstContent.slice(0, 60)}...`);
    }

    console.log('');
  }

  // 3. 使用方式
  console.log('='.repeat(50));
  console.log('\n>> Step 3: 如何使用角色模板\n');
  console.log('  方式 1: CLI 一键初始化');
  console.log('    npx agent-workstation init --category engineering --role frontend-developer\n');
  console.log('  方式 2: 编程调用');
  console.log('    const { getRole } = require("agent-workstation");');
  console.log('    const role = getRole("engineering", "frontend-developer");\n');
  console.log('  方式 3: 与 OPC Agent + DeepBrain 结合');
  console.log('    Workstation 选模板 → OPC Agent 运行 → DeepBrain 记忆进化\n');

  console.log('='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log(`  ${totalRoles} 个角色模板, 覆盖 ${categories.length} 个分类`);
  console.log('  每个角色包含: OAD 配置 + System Prompt + Brain Seed\n');
  console.log('下一步: npm run demo:brain (开发者知识库)\n');
}

main();
