import { startQuoteSyncJob, startTokenSyncJob } from './openocean';

export const run = () => {
  console.log('cron job run...');
  startQuoteSyncJob();
  startTokenSyncJob();
};

run();
