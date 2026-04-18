// Show how to set up scheduled jobs
import { AgentRuntime, Scheduler } from 'opc-agent';

const scheduler = new Scheduler();

// Add a job that runs every 5 minutes
scheduler.addJob({
  id: 'health-check',
  name: 'Health Check',
  schedule: '*/5 * * * *',
  task: 'Check system health and report any issues',
  enabled: true,
});

// Add a daily summary job
scheduler.addJob({
  id: 'daily-summary',
  name: 'Daily Summary',
  schedule: '0 9 * * *',
  task: 'Generate a summary of yesterday activities',
  enabled: true,
});

console.log('Scheduled jobs:');
for (const job of scheduler.getJobs()) {
  console.log(`  ${job.name} (${job.schedule}) - ${job.enabled ? 'enabled' : 'disabled'}`);
}
