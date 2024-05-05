import { createStore } from 'swr-global-state';
import { Bucket } from '@/models/bucket';
import { loadConfig } from '@/utils/ConfigSaver';

export const useBucketsStore = createStore<Bucket[]>({
  key: '@app/buckets',
  initial: loadConfig(),
});
