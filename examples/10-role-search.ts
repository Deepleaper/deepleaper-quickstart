/**
 * Demo 10: Role Search & Validation (agent-workstation 1.2.0)
 *
 * Shows the new search and discovery features:
 * - searchRoles(): fuzzy search across all roles
 * - getPopularRoles(): curated list of most-used roles
 * - validateRole(): check if a role config is valid
 * - getRole(): fetch a specific role with rich prompts
 *
 * No API keys needed.
 */

import { searchRoles, validateRole, getPopularRoles, getRole } from 'agent-workstation';

function main() {
  console.log('=== Demo 10: Role Search & Validation ===\n');

  // --- 1. Get popular roles ---
  console.log('🌟 Popular roles:');
  const popular = getPopularRoles();
  console.log(popular);

  // --- 2. Search roles by keyword ---
  console.log('\n🔍 Searching for "developer" roles:');
  const devResults = searchRoles('developer');
  console.log(devResults);

  console.log('\n🔍 Searching for "marketing" roles:');
  const mktResults = searchRoles('marketing');
  console.log(mktResults);

  console.log('\n🔍 Searching for "data" roles:');
  const dataResults = searchRoles('data');
  console.log(dataResults);

  // --- 3. Get a specific role ---
  console.log('\n📋 Getting "developer/fullstack" role:');
  const role = getRole('developer', 'fullstack');
  if (role) {
    console.log(`  Name: ${role.name}`);
    console.log(`  Description: ${role.description}`);
    console.log(`  System prompt length: ${role.systemPrompt?.length || 0} chars`);
  } else {
    console.log('  (role not found — try a different category/name)');
  }

  // --- 4. Validate a role config ---
  console.log('\n✅ Validating a custom role config:');
  const validResult = validateRole({
    name: 'my-custom-agent',
    description: 'A custom agent for testing',
    systemPrompt: 'You are a helpful assistant.',
  });
  console.log('  Valid config:', validResult);

  console.log('\n❌ Validating an invalid role config (missing name):');
  const invalidResult = validateRole({
    description: 'Missing name field',
  } as any);
  console.log('  Invalid config:', invalidResult);

  console.log('\n✅ Demo 10 complete!');
}

main();
