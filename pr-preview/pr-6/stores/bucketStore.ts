import { createStore } from 'swr-global-state';
import type { StatePersistor, StateKey } from 'swr-global-state';
import { Bucket } from '@/models/bucket';

const withLocalStoragePersistor = <T = Bucket[]>(): StatePersistor<T> => ({
  onSet(key: StateKey, data: T) {
    const stringifyData = JSON.stringify(data);
    window.localStorage.setItem(String(key), stringifyData);
  },
  onGet(key: StateKey) {
    const cachedData = window.localStorage.getItem(String(key)) ?? '[]';
    try {
      return JSON.parse(cachedData);
    } catch {
      return cachedData;
    }
  },
});

export const useBucketsStore = createStore<Bucket[]>({
  key: '@app/buckets',
  initial: [],
  persistor: withLocalStoragePersistor(),
});
