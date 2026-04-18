/**
 * Demo 07: 智能模型推荐 + 成本估算 (agentkits 1.8.0)
 *
 * 功能: 推荐模型、估算 token 成本、检查 Provider 健康
 * 无需 API Key（推荐和估价功能）
 *
 * 运行: npm run demo:model
 */

import { recommendModel, estimateModelCost, checkProvider } from 'agentkits';

async function main() {
  console.log('\n=== Demo 07: 智能模型推荐 + 成本估算 ===\n');
  console.log('='.repeat(50));

  // 1. 模型推荐
  console.log('\n>> 推荐模型 (chat, 免费, 本地):');
  try {
    const chatModels = recommendModel({ task: 'chat', budget: 'free', local: true });
    console.log(JSON.stringify(chatModels, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 推荐模型 (coding, 低预算):');
  try {
    const codingModels = recommendModel({ task: 'coding', budget: 'low' });
    console.log(JSON.stringify(codingModels, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 推荐模型 (analysis):');
  try {
    const analysisModels = recommendModel({ task: 'analysis' });
    console.log(JSON.stringify(analysisModels, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 2. 成本估算
  console.log('\n' + '='.repeat(50));
  console.log('\n>> 成本估算: gpt-4o (1000 input, 500 output tokens):');
  try {
    const cost = estimateModelCost('gpt-4o', 1000, 500);
    console.log(JSON.stringify(cost, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  console.log('\n>> 成本估算: claude-sonnet-4-20250514 (5000 input, 2000 output tokens):');
  try {
    const cost2 = estimateModelCost('claude-sonnet-4-20250514', 5000, 2000);
    console.log(JSON.stringify(cost2, null, 2));
  } catch (e: any) {
    console.log(`  [error] ${e.message}`);
  }

  // 3. Provider 健康检查
  console.log('\n' + '='.repeat(50));
  console.log('\n>> 检查 Ollama provider 状态:');
  try {
    const health = await checkProvider('ollama');
    console.log(JSON.stringify(health, null, 2));
  } catch (e: any) {
    console.log(`  [info] Ollama 未运行 (这是正常的，如果你没安装 Ollama)`);
    console.log(`         Ollama not running? Install from: https://ollama.com`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('[DONE] Demo 完成!\n');
  console.log('下一步: npm run demo:skill (自动技能学习)\n');
}

main().catch(console.error);
