import { Bucket } from '@/models/bucket';

const key = 'kiwigo-buckets';

export function saveConfig(buckets: Bucket[]) {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(key, JSON.stringify(buckets));
}

export function loadConfig(): Bucket[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const buckets = localStorage.getItem(key);
  if (buckets) {
    return JSON.parse(buckets);
  } else {
    return [];
  }
}
