/**
 * Customer Service Agent — End-to-End Tutorial
 *
 * This example ties together ALL 4 Deepleaper packages:
 *   1. deepbrain       — Persistent memory (Brain + AgentBrain)
 *   2. opc-agent       — Agent runtime, web channel, skills framework
 *   3. agentkits       — LLM & embedding providers (used by deepbrain internally)
 *   4. agent-workstation — Role templates (used here for knowledge seeding)
 */

import { AgentRuntime, BaseAgent, WebChannel } from 'opc-agent';
import { Brain, AgentBrain } from 'deepbrain';
import { getCategories, getRole } from 'agent-workstation';
import { OrderLookupSkill } from './skills/order-lookup.js';
import { FAQSkill } from './skills/faq.js';

async function main() {
  console.log('🤖 Starting Customer Service Agent...\n');

  // ── Step 1: Initialize DeepBrain ──────────────────────────────
  // Brain uses PGLite (embedded Postgres) + agentkits embedding under the hood.
  // This gives the agent persistent, semantic memory — no external DB needed.
  const brain = new Brain({
    database: './agent-brain-data',
    embedding_provider: 'ollama',  // uses nomic-embed-text via agentkits
  });
  await brain.connect();
  const agentBrain = new AgentBrain(brain, 'customer-service');
  console.log('✅ DeepBrain initialized (PGLite + Ollama embeddings via agentkits)');

  // ── Step 2: Show available role templates from agent-workstation ─
  // agent-workstation provides pre-built role configs (customer-service, developer, etc.)
  const categories = getCategories();
  console.log(`📂 agent-workstation has ${categories.length} role categories: ${categories.map(c => c.name).join(', ')}`);

  // ── Step 3: Seed knowledge into DeepBrain ─────────────────────
  // In production, you'd pull this from a knowledge base or CMS.
  // AgentBrain.learn() stores traces as searchable pages in DeepBrain.
  const stats = await brain.stats();
  if (stats.pages === 0) {
    console.log('📚 Loading initial knowledge...');
    const knowledge = [
      { action: 'Return policy', result: '7-day no-questions-asked return. Original packaging required. After 7 days, contact support for case-by-case review.' },
      { action: 'Shipping info', result: 'Standard shipping 3-5 days, express 1-2 days. Free shipping over $50. Track at track.example.com' },
      { action: 'Payment methods', result: 'We accept credit cards (Visa, MC, Amex), PayPal, Apple Pay, and bank transfer.' },
      { action: 'Business hours', result: 'Mon-Fri 9am-6pm, Sat 10am-4pm. Online chat 24/7. Emergency line: 400-xxx-xxxx' },
      { action: 'Warranty', result: 'All products come with 1-year warranty. Extended warranty available for purchase.' },
    ];
    for (const k of knowledge) {
      await agentBrain.learn(k);
    }
    console.log(`  📌 Loaded ${knowledge.length} knowledge items into DeepBrain`);
  } else {
    console.log(`📚 DeepBrain already has ${stats.pages} pages of knowledge`);
  }

  // ── Step 4: Load OAD config and create runtime ────────────────
  // OAD (Open Agent Definition) is opc-agent's declarative config format.
  // It defines the agent's model, channels, memory, and skills.
  const runtime = new AgentRuntime();
  await runtime.loadConfig('./agent.yaml');
  const agent = await runtime.initialize();
  console.log('✅ Agent runtime initialized (opc-agent)');

  // ── Step 5: Register skills ───────────────────────────────────
  // Skills are self-contained handlers that the agent checks before LLM fallback.
  // OrderLookupSkill: pattern-matches order IDs
  // FAQSkill: queries DeepBrain memory for FAQ answers
  runtime.registerSkill(new OrderLookupSkill());
  runtime.registerSkill(new FAQSkill(agentBrain));
  console.log('✅ Skills registered (order-lookup, faq)');

  // ── Step 6: Start! ────────────────────────────────────────────
  await runtime.start();

  console.log('\n' + '━'.repeat(50));
  console.log('🎉 Agent is running!');
  console.log('   🌐 Web UI: http://localhost:3000');
  console.log('   💬 Open in browser and start chatting');
  console.log('━'.repeat(50));
  console.log('\nTry these:');
  console.log('  "What is your return policy?"  → FAQ skill + DeepBrain recall');
  console.log('  "Check order ORD-12345"        → Order lookup skill');
  console.log('  "How can I pay?"               → FAQ skill + DeepBrain recall');
  console.log('  "Tell me a joke"               → Falls through to LLM');
  console.log('\nPress Ctrl+C to stop\n');
}

main().catch(e => {
  console.error('❌ Failed to start:', e.message || e);
  console.error(e.stack || e);
  process.exit(1);
});
