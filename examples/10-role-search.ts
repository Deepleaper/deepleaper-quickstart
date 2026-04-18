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

  // 3. 获取具体角色
  console.log('\n' + '='.repeat(50));
  console.log('\n>> 获取 "developer/fullstack" 角色:');
  try {
    const role = getRole('developer', 'fullstack');
    if (role) {
      console.log(`  Name: ${role.name}`);
      console.log(`  Description: ${role.description}`);
      console.log(`  System prompt: ${role.systemPrompt?.length || 0} chars`);
    } else {
      console.log('  (角色未找到 — 尝试其他 category/name)');
    }
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 4. 验证角色配置
  console.log('\n>> 验证自定义角色 (正确配置):');
  try {
    const validResult = validateRole({
      name: 'my-custom-agent',
      description: 'A custom agent for testing',
      systemPrompt: 'You are a helpful assistant.',
    });
    console.log('  Result:', JSON.stringify(validResult));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 验证自定义角色 (缺少 name):');
  try {
    const invalidResult = validateRole({
      description: 'Missing name field',
    } as any);
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
