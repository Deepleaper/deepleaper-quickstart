/**
 * Customer Service Agent - End-to-End Tutorial
 *
 * Ties together ALL 4 Deepleaper packages:
 *   1. deepbrain       - Persistent memory (Brain + AgentBrain)
 *   2. opc-agent       - Agent runtime, web channel, skills framework
 *   3. agentkits       - LLM & embedding providers (used by deepbrain)
 *   4. agent-workstation - Role templates
 *
 * Note: DeepBrain requires Ollama running + Node <=22 (PGLite WASM).
 * Without it, the agent still works — just without memory.
 */

import { AgentRuntime } from 'opc-agent';
import { OrderLookupSkill } from './skills/order-lookup.js';
import { FAQSkill } from './skills/faq.js';

async function initBrain(): Promise<any> {
  if (process.env.SKIP_DEEPBRAIN || parseInt(process.versions.node) >= 24) {
    console.log('[SKIP] DeepBrain skipped (Node 24+ has PGLite WASM issue, use Node 22)');
    return null;
  }
  try {
    const { Brain, AgentBrain } = await import('deepbrain');
    const brain = new Brain({
      database: './agent-brain-data',
      embedding_provider: 'ollama',
    });
    await brain.connect();
    const agentBrain = new AgentBrain(brain, 'customer-service');
    console.log('[OK] DeepBrain initialized');

    const stats = await brain.stats();
    if (stats.pages === 0) {
      console.log('  Loading initial knowledge...');
      const knowledge = [
        { action: 'Return policy', result: '7-day no-questions-asked return. Original packaging required.' },
        { action: 'Shipping info', result: 'Standard shipping 3-5 days, express 1-2 days. Free shipping over $50.' },
        { action: 'Payment methods', result: 'We accept Visa, MC, Amex, PayPal, Apple Pay, and bank transfer.' },
        { action: 'Business hours', result: 'Mon-Fri 9am-6pm, Sat 10am-4pm. Online chat 24/7.' },
        { action: 'Warranty', result: 'All products come with 1-year warranty.' },
      ];
      for (const k of knowledge) await agentBrain.learn(k);
      console.log(`  Loaded ${knowledge.length} knowledge items`);
    }
    return agentBrain;
  } catch (e: any) {
    console.warn(`[WARN] DeepBrain unavailable: ${e.message || e}`);
    console.warn('  Agent will run without memory. Needs Ollama + Node <=22.');
    return null;
  }
}

async function main() {
  console.log('Starting Customer Service Agent...\n');

  // Step 1: Try DeepBrain (graceful degradation)
  const agentBrain = await initBrain();

  // Step 2: agent-workstation role templates
  try {
    const { getCategories } = await import('agent-workstation');
    const categories = getCategories();
    console.log(`[OK] agent-workstation: ${categories.length} role categories`);
  } catch { console.log('[OK] agent-workstation loaded'); }

  // Step 3: OAD config + runtime
  const runtime = new AgentRuntime();
  await runtime.loadConfig('./agent.yaml');
  await runtime.initialize();
  console.log('[OK] Agent runtime initialized');

  // Step 4: Register skills
  runtime.registerSkill(new OrderLookupSkill());
  runtime.registerSkill(new FAQSkill(agentBrain));
  console.log('[OK] Skills registered');

  // Step 5: Start
  await runtime.start();

  console.log('\n' + '='.repeat(50));
  console.log('Agent is running!');
  console.log('  Web UI:    http://localhost:3000');
  console.log('  Dashboard: http://localhost:3000/dashboard');
  console.log('='.repeat(50));
  console.log('\nTry:');
  console.log('  "What is your return policy?"  -> FAQ skill');
  console.log('  "/echo hello"                  -> Echo skill');
  console.log('  "Check order ORD-12345"        -> Order lookup');
  console.log('\nPress Ctrl+C to stop\n');
}

main().catch(e => {
  console.error('Failed to start:', e.message || e);
  process.exit(1);
});
