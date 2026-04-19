/**
 * Demo 21: 3-Tier Brain Seeds
 * 
 * Shows how brain seeds (industry→job→workstation) are loaded
 * and how knowledge evolves bottom-up.
 * 
 * Prerequisites: npm install deepbrain agent-workstation
 * Run: npx tsx examples/21-brain-seeds.ts
 */

import { Brain } from 'deepbrain';
import { getBrainSeeds, getIndustryBrainSeed } from 'agent-workstation';

async function main() {
  console.log('=== Demo 21: 3-Tier Brain Seeds ===\n');

  // Step 1: Show the 3 tiers for a role
  console.log('>> Step 1: Get brain seeds for "frontend-developer"');
  let seeds: Record<string, string | null>;
  try {
    seeds = getBrainSeeds('frontend-developer');
  } catch (e: any) {
    console.log(`  [WARN] getBrainSeeds error: ${e.message}`);
    console.log('  (This may be a packaging issue with agent-workstation templates)');
    seeds = { industry: null, job: null, workstation: null };
  }
  console.log(`  Industry seed: ${seeds.industry ? seeds.industry.substring(0, 80) + '...' : 'N/A'}`);
  console.log(`  Job seed: ${seeds.job ? seeds.job.substring(0, 80) + '...' : 'N/A'}`);
  console.log(`  Workstation seed: ${seeds.workstation ? seeds.workstation.substring(0, 80) + '...' : 'N/A'}`);

  // Step 2: Initialize brain and import seeds
  console.log('\n>> Step 2: Import seeds into brain');

  // Detect embedding provider
  let provider = 'ollama';
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'ollama') provider = 'openai';
  else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) provider = 'gemini';

  // Check ollama availability
  if (provider === 'ollama') {
    try {
      const res = await fetch('http://localhost:11434/api/tags');
      if (!res.ok) throw new Error('not ok');
    } catch {
      console.log('  [SKIP] Ollama not running — skipping brain operations');
      console.log('  Install Ollama: https://ollama.com');
      console.log('  Then: ollama pull nomic-embed-text\n');
      showIndustrySeeds();
      return;
    }
  }

  const brain = new Brain({
    embedding_provider: provider,
    database: './demo-brain-seeds',
  });
  await brain.connect();

  // Import each tier
  for (const [tier, content] of Object.entries(seeds)) {
    if (content) {
      await brain.put(`seed-${tier}`, {
        type: 'knowledge',
        title: `${tier} knowledge`,
        compiled_truth: content,
      });
      console.log(`  [OK] Imported ${tier} seed`);
    }
  }

  // Step 3: Query the knowledge
  console.log('\n>> Step 3: Query brain');
  const results = await brain.query('frontend best practices');
  console.log(`  Found ${results.length} results`);
  results.slice(0, 3).forEach((r: any, i: number) => {
    const text = r.chunk_text || r.compiled_truth || '';
    console.log(`  ${i + 1}. ${text.substring(0, 100)}...`);
  });

  await brain.disconnect();
  showIndustrySeeds();
}

function showIndustrySeeds() {
  // Step 4: Show all industry seeds
  console.log('\n>> Step 4: Available industry seeds');
  const industries = ['tech', 'finance', 'healthcare', 'marketing', 'engineering'];
  for (const ind of industries) {
    try {
      const seed = getIndustryBrainSeed(ind);
      console.log(`  ${ind}: ${seed ? '[OK]' : '[MISSING]'}`);
    } catch {
      console.log(`  ${ind}: [ERROR]`);
    }
  }

  console.log('\n[DONE] Brain seeds demo complete');
  console.log('Next: Try "opc init --role frontend-developer" to scaffold a full agent');
}

main().catch(console.error);
