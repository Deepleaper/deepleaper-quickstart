/**
 * Demo 08: Skill 自动学习 (opc-agent 1.4.0 概念)
 *
 * OPC Agent 自主技能学习: Agent 从对话中自动提炼可复用 Skill
 * 纯概念展示，展示 auto-skill 的工作原理
 *
 * 运行: npm run demo:skill
 */

console.log('\n=== Demo 08: Skill 自动学习 (概念展示) ===\n');
console.log('='.repeat(50));

console.log('\n>> OPC Agent 1.4.0 Auto-Skill 学习流程:\n');

console.log('  1. [观察] Conversation Analysis');
console.log('     Agent 追踪跨会话的重复请求模式');
console.log('     例如: "deploy X to staging" 出现 3+ 次\n');

console.log('  2. [识别] Pattern Detection');
console.log('     SkillLearner 识别: 触发词、步骤、使用的工具');
console.log('     将相似请求聚类为候选 Skill\n');

console.log('  3. [生成] Skill Generation');
console.log('     自动创建 SKILL.md:');
console.log('     - 名称 & 描述');
console.log('     - 触发短语');
console.log('     - 步骤指令');
console.log('     - 引用的脚本/命令\n');

console.log('  4. [激活] Auto-Activation');
console.log('     新 Skill 注册后自动匹配后续请求');
console.log('     Agent 越用越好,无需手动配置\n');

// 概念代码
console.log('>> 内部 API (opc-agent daemon 内部):');
console.log('');
console.log('  const learner = new SkillLearner(agent);');
console.log('  learner.analyze(conversationHistory);');
console.log('  const candidates = learner.detectPatterns();');
console.log('  for (const c of candidates) {');
console.log('    await learner.generateSkill(c);  // writes SKILL.md');
console.log('    agent.registerSkill(c.path);');
console.log('  }');
console.log('');

console.log('>> 体验 auto-skill:');
console.log('  npm i -g opc-agent');
console.log('  opc chat                  # 交互式 TUI');
console.log('  opc daemon start          # 后台 daemon');
console.log('  # 重复类似任务 → Skill 自动涌现!\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:subagent (多 Agent 协作)\n');
