// Show the skill learning system
import { SkillLearner } from 'opc-agent';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

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
