/**
 * Demo 19: 四件套集成 — DeepBrain + OPC Agent + AgentKits + Workstation
 *
 * 展示四个包的联合使用模式
 *
 * 运行: npm run demo:integration
 */

import { Brain } from 'deepbrain';
import { recommendModel } from 'agentkits';
import { getPopularRoles } from 'agent-workstation';

console.log('\n=== Demo 19: 四件套集成 ===\n');
console.log('='.repeat(50));

// 1. agentkits: recommend a model
console.log('\n>> [agentkits] 模型推荐:');
try {
  const models = recommendModel({ task: 'chat', budget: 'free', local: true });
  const names = Array.isArray(models) ? models.map((m: any) => m.model || m.name || m).join(', ') : JSON.stringify(models);
  console.log(`  推荐: ${names}`);
} catch (e: any) {
  console.log(`  [error] ${e.message}`);
}

// 2. agent-workstation: find roles
console.log('\n>> [agent-workstation] 热门角色:');
try {
  const roles = getPopularRoles();
  console.log(`  共 ${Array.isArray(roles) ? roles.length : 0} 个热门角色`);
} catch (e: any) {
  console.log(`  [error] ${e.message}`);
}

// 3. Integration pattern
console.log('\n>> 集成模式:');
console.log('  1. agentkits     → 推荐最佳模型');
console.log('  2. workstation   → 提供角色模板和 Prompt');
console.log('  3. deepbrain     → 持久化记忆和知识进化');
console.log('  4. opc-agent     → 运行时引擎，串联一切');

console.log('\n' + '='.repeat(50));
console.log('[DONE] Demo 完成!\n');
