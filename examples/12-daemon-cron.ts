/**
 * Demo 12: Daemon Cron - 定时任务调度
 *
 * Scheduler API 注册定时任务（健康检查、每日摘要）
 * 展示 opc-agent 的 cron 调度能力
 *
 * 运行: npm run demo:daemon
 */

console.log('\n=== Demo 12: Daemon Cron - 定时任务 ===\n');
console.log('='.repeat(50));

console.log('\n>> OPC Agent Scheduler API:\n');
console.log('  import { Scheduler } from "opc-agent";\n');
console.log('  const scheduler = new Scheduler();\n');
console.log('  // Add a health check job (every 5 minutes)');
console.log('  scheduler.addJob({');
console.log('    id: "health-check",');
console.log('    name: "Health Check",');
console.log('    schedule: "*/5 * * * *",');
console.log('    task: "Check system health and report any issues",');
console.log('    enabled: true,');
console.log('  });\n');
console.log('  // Add a daily summary job (9am)');
console.log('  scheduler.addJob({');
console.log('    id: "daily-summary",');
console.log('    name: "Daily Summary",');
console.log('    schedule: "0 9 * * *",');
console.log('    task: "Generate a summary of yesterday activities",');
console.log('    enabled: true,');
console.log('  });\n');

console.log('>> 使用方式:');
console.log('  opc daemon start       # 启动 daemon');
console.log('  opc daemon status      # 查看状态');
console.log('  opc daemon jobs        # 列出定时任务\n');

console.log('='.repeat(50));
console.log('[DONE] Demo 完成!\n');
console.log('下一步: npm run demo:auto-skill (自动学习)\n');
