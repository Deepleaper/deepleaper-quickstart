/**
 * Demo 10: 角色搜索 + 验证 (agent-workstation 1.2.0)
 *
 * 搜索角色模板、获取热门角色、验证自定义角色配置
 * 无需 API Key
 *
 * 运行: npm run demo:roles
 */

import { searchRoles, validateRole, getPopularRoles, getRole } from 'agent-workstation';

function main() {
  console.log('\n=== Demo 10: 角色搜索 + 验证 ===\n');
  console.log('='.repeat(50));

  // 1. 热门角色
  console.log('\n>> 热门角色:');
  try {
    const popular = getPopularRoles();
    console.log(JSON.stringify(popular, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 2. 关键词搜索
  console.log('\n>> 搜索 "developer" 角色:');
  try {
    const devResults = searchRoles('developer');
    console.log(JSON.stringify(devResults, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 搜索 "marketing" 角色:');
  try {
    const mktResults = searchRoles('marketing');
    console.log(JSON.stringify(mktResults, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 搜索 "data" 角色:');
  try {
    const dataResults = searchRoles('data');
    console.log(JSON.stringify(dataResults, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 3. 获取具体角色 (v2 API: getRole returns { category, role, files })
  console.log('\n' + '='.repeat(50));
  console.log('\n>> 获取 "engineering/frontend-developer" 角色:');
  try {
    const role = getRole('engineering', 'frontend-developer');
    if (role) {
      console.log(`  Category: ${role.category}`);
      console.log(`  Role: ${role.role}`);
      const fileNames = Object.keys(role.files).filter((f: string) => !f.endsWith('/'));
      console.log(`  Files: ${fileNames.join(', ')}`);
      const systemPrompt = role.files['system.md'];
      if (systemPrompt) {
        console.log(`  System prompt: ${systemPrompt.length} chars`);
      }
    } else {
      console.log('  (角色未找到)');
    }
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 4. 验证角色配置 (v2 API: validateRole takes category + role name strings)
  console.log('\n>> 验证已有角色 (engineering/frontend-developer):');
  try {
    const validResult = validateRole('engineering', 'frontend-developer');
    console.log('  Result:', JSON.stringify(validResult));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 验证不存在的角色:');
  try {
    const invalidResult = validateRole('nonexistent', 'fake-role');
    console.log('  Result:', JSON.stringify(invalidResult));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('核心 10 个 Demo 到此结束。推荐下一步:');
  console.log('  - 全栈: cd e2e-local && npm install && npm start');
  console.log('  - 进阶: npm run demo:cli-chat (Demo 11-20)\n');
}

main();
