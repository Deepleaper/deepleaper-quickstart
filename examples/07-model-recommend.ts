/**
 * Demo 07: Model Recommendation + Cost Estimation (agentkits 1.8.0)
 *
 * Shows how to use agentkits to:
 * - Recommend models for different tasks and budgets
 * - Estimate token costs for any model
 * - Check provider health/availability
 *
 * No API keys needed for recommendation & cost estimation.
 */

import { recommendModel, estimateModelCost, checkProvider } from 'agentkits';

async function main() {
  console.log('=== Demo 07: Model Recommendation & Cost Estimation ===\n');

  // --- 1. Recommend models for different tasks ---
  console.log('📋 Recommending models for chat (free, local):');
  const chatModels = recommendModel({ task: 'chat', budget: 'free', local: true });
  console.log(chatModels);

  console.log('\n📋 Recommending models for coding (low budget):');
  const codingModels = recommendModel({ task: 'coding', budget: 'low' });
  console.log(codingModels);

  console.log('\n📋 Recommending models for analysis:');
  const analysisModels = recommendModel({ task: 'analysis' });
  console.log(analysisModels);

  // --- 2. Estimate costs ---
  console.log('\n💰 Cost estimation for gpt-4o (1000 input, 500 output tokens):');
  const cost = estimateModelCost('gpt-4o', 1000, 500);
  console.log(cost);

  console.log('\n💰 Cost estimation for claude-sonnet-4-20250514 (5000 input, 2000 output tokens):');
  const cost2 = estimateModelCost('claude-sonnet-4-20250514', 5000, 2000);
  console.log(cost2);

  // --- 3. Check provider health ---
  console.log('\n🏥 Checking Ollama provider health:');
  const health = await checkProvider('ollama');
  console.log(health);

  console.log('\n✅ Demo 07 complete!');
}

main().catch(console.error);
