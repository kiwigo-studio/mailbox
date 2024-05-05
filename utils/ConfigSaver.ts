import { Bucket } from '@/models/bucket';

const key = 'kiwigo-buckets';

export function saveConfig(buckets: Bucket[]) {
  localStorage.setItem(key, JSON.stringify(buckets));
}

export function loadConfig(): Bucket[] {
  const buckets = localStorage.getItem(key);
  if (buckets) {
    return JSON.parse(buckets);
  } else {
    return [];
  }
}
