/**
 * Demo 12: Daemon Cron — 定时任务调度
 *
 * Scheduler API 注册定时任务（健康检查、每日摘要）
 * 展示 opc-agent 的 cron 调度能力
 *
 * 运行: npm run demo:daemon
 */

import { AgentRuntime, Scheduler } from 'opc-agent';

console.log('\n=== Demo 12: Daemon Cron — 定时任务 ===\n');

try {
  const scheduler = new Scheduler();

  // Add a health check job (every 5 minutes)
  scheduler.addJob({
    id: 'health-check',
    name: 'Health Check',
    schedule: '*/5 * * * *',
    task: 'Check system health and report any issues',
    enabled: true,
  });

  // Add a daily summary job (9am)
  scheduler.addJob({
    id: 'daily-summary',
    name: 'Daily Summary',
    schedule: '0 9 * * *',
    task: 'Generate a summary of yesterday activities',
    enabled: true,
  });

  console.log('Scheduled jobs:');
  for (const job of scheduler.getJobs()) {
    console.log(`  [${job.enabled ? 'ON' : 'OFF'}] ${job.name} (${job.schedule}) — ${job.task}`);
  }

  console.log('\n[DONE] Demo 完成!');
} catch (e: any) {
  console.error(`[ERROR] ${e.message}`);
  process.exit(1);
}
