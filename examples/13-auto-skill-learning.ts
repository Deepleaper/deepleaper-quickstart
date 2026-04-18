/**
 * Demo 13: Auto-Skill Learning - 自动技能学习
 *
 * SkillLearner 检测/生成/注册技能
 * Agent 从对话中自动提取可复用的 Skill
 *
 * 运行: npm run demo:auto-skill
 */

console.log('\n=== Demo 13: Auto-Skill Learning ===\n');
console.log('='.repeat(50));

console.log('\n>> SkillLearner API (opc-agent runtime 内置):\n');
console.log('  import { SkillLearner } from "opc-agent";\n');
console.log('  const learner = new SkillLearner("./skills");\n');
console.log('  // Save a learned skill');
console.log('  learner.saveSkill({');
console.log('    name: "deploy-to-prod",');
console.log('    description: "Deploy application to production",');
console.log('    trigger: "deploy|push to prod|release",');
console.log('    instructions: "1. Run tests\\n2. Build\\n3. Deploy\\n4. Verify",');
console.log('    examples: ["deploy to production", "push the latest release"],');
console.log('    createdAt: new Date().toISOString(),');
console.log('    usageCount: 0,');
console.log('    version: 1,');
console.log('  });\n');
console.log('  // Load and match skills');
console.log('  const skills = learner.loadSkills();');
console.log('  const match = learner.matchSkill("can you deploy to production?");');
console.log('  console.log(match?.name, match?.instructions);\n');

console.log('>> 使用方式:');
console.log('  opc chat           # 正常对话');
console.log('  # 重复模式自动被检测 → Skill 自动生成!\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:parallel (子 Agent)\n');
