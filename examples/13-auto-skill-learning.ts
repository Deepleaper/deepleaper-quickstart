/**
 * Demo 13: Auto-Skill Learning — 技能学习系统
 *
 * SkillLearner 保存/加载/匹配技能
 * Agent 从对话中自动提炼可复用 Skill
 *
 * 运行: npm run demo:auto-skill
 */

import { SkillLearner } from 'opc-agent';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

console.log('\n=== Demo 13: Auto-Skill Learning ===\n');

try {
  const tmpDir = mkdtempSync(join(tmpdir(), 'skills-'));
  const learner = new SkillLearner(tmpDir);

  // Create a skill manually (normally the LLM does this)
  learner.saveSkill({
    name: 'deploy-to-prod',
    description: 'Deploy application to production',
    trigger: 'deploy|push to prod|release',
    instructions: '1. Run tests\n2. Build project\n3. Deploy to server\n4. Verify health check',
    examples: ['deploy to production', 'push the latest release', 'release v2.0'],
    createdAt: new Date().toISOString(),
    usageCount: 0,
    version: 1,
  });

  // Load and match
  const skills = learner.loadSkills();
  console.log(`Learned skills: ${skills.length}`);

  const match = learner.matchSkill('can you deploy to production?');
  console.log(`Matched: ${match?.name} — ${match?.description}`);
  console.log(`Instructions:\n${match?.instructions}\n`);

  console.log('[DONE] Demo 完成!');
} catch (e: any) {
  console.error(`[ERROR] ${e.message}`);
  process.exit(1);
}
