/**
 * Demo 5: Agent Workstation — 虚拟工位模板
 * 
 * 无需 API Key，纯展示 100+ 角色模板
 * 
 * 运行: npm run demo:workstation
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { getCategories, getRole } = require('agent-workstation');

function main() {
  console.log('🏢 Agent Workstation Demo — 虚拟工位\n');
  console.log('━'.repeat(50));

  // 1. 浏览所有职能分类
  console.log('\n📋 Step 1: 浏览职能分类\n');
  
  const categories = getCategories();
  let totalRoles = 0;
  
  for (const cat of categories) {
    console.log(`  📁 ${cat.name} (${cat.roles.length} 个角色)`);
    for (const role of cat.roles.slice(0, 3)) {
      console.log(`     └─ ${role}`);
    }
    if (cat.roles.length > 3) {
      console.log(`     └─ ... 还有 ${cat.roles.length - 3} 个`);
    }
    totalRoles += cat.roles.length;
  }
  console.log(`\n  📊 共 ${categories.length} 个职能分类，${totalRoles} 个角色模板\n`);

  // 2. 查看具体角色
  console.log('━'.repeat(50));
  console.log('\n🔍 Step 2: 查看具体角色\n');

  const examples = [
    ['engineering', 'frontend-developer'],
    ['marketing', 'seo-specialist'],
    ['data', 'data-analyst'],
  ];

  for (const [category, roleName] of examples) {
    const role = getRole(category, roleName);
    if (!role) {
      console.log(`  ❌ ${category}/${roleName} 不存在`);
      continue;
    }

    console.log(`  🤖 ${category}/${roleName}`);
    
    // 展示文件
    const fileNames = Object.keys(role.files).filter((f: string) => !f.endsWith('/'));
    console.log(`     文件: ${fileNames.join(', ')}`);
    
    // OAD 配置摘要
    const oad = role.files['oad.yaml'];
    if (oad) {
      const titleMatch = oad.match(/en:\s*"([^"]+)"/);
      if (titleMatch) console.log(`     标题: ${titleMatch[1]}`);
      const descMatch = oad.match(/description:\s*\n\s*en:\s*"([^"]+)"/);
      if (descMatch) console.log(`     描述: ${descMatch[1].slice(0, 60)}...`);
    }

    // System Prompt 第一行
    const systemPrompt = role.files['system.md'];
    if (systemPrompt) {
      const firstContent = systemPrompt.split('\n').find((l: string) => l.startsWith('You are'));
      if (firstContent) console.log(`     角色: ${firstContent.slice(0, 60)}...`);
    }

    console.log('');
  }

  // 3. 如何使用
  console.log('━'.repeat(50));
  console.log('\n📝 Step 3: 如何使用工位模板\n');
  console.log('  方式 1: CLI 快速创建');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │ npx agent-workstation init \\             │');
  console.log('  │   --category engineering \\               │');
  console.log('  │   --role frontend-developer              │');
  console.log('  └─────────────────────────────────────────┘\n');
  console.log('  方式 2: 代码调用');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │ const { getRole } = require(             │');
  console.log('  │   "agent-workstation"                    │');
  console.log('  │ );                                       │');
  console.log('  │ const role = getRole(                    │');
  console.log('  │   "engineering",                         │');
  console.log('  │   "frontend-developer"                   │');
  console.log('  │ );                                       │');
  console.log('  │ // role.files["oad.yaml"]                │');
  console.log('  │ // role.files["prompts/system.md"]       │');
  console.log('  └─────────────────────────────────────────┘\n');

  // 4. 与其他组件集成
  console.log('  方式 3: 与 OPC Agent + DeepBrain 集成');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │  Workstation 模板                        │');
  console.log('  │    ↓ OAD 配置                           │');
  console.log('  │  OPC Agent 加载                         │');
  console.log('  │    ↓ 运行时                             │');
  console.log('  │  DeepBrain 记忆                         │');
  console.log('  │    ↓ learn/recall/evolve                │');
  console.log('  │  Agent 越用越聪明                       │');
  console.log('  └─────────────────────────────────────────┘\n');

  console.log('━'.repeat(50));
  console.log('🎉 Demo 完成！\n');
  console.log(`  ${totalRoles} 个角色模板，覆盖 ${categories.length} 个职能`);
  console.log('  每个模板包含: OAD 配置 + System Prompt + Brain Seed\n');
  console.log('  文档: https://github.com/Deepleaper/agent-workstation\n');
}

main();
