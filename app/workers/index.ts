import { startQuoteSyncJob, startTokenSyncJob } from './openocean';

export const run = () => {
  startQuoteSyncJob();
  startTokenSyncJob();
};

run();
