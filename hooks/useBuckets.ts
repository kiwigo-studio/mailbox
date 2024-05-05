import { useEffect, useState } from 'react';
import { Bucket } from '@/models/bucket';
import { loadConfig, saveConfig } from '@/utils/ConfigSaver';

export function useBuckets(): [Bucket[], React.Dispatch<React.SetStateAction<Bucket[]>>] {
  const [buckets, setBuckets] = useState<Bucket[]>(loadConfig());

  useEffect(() => {
    saveConfig(buckets);
  }, [buckets]);

  return [buckets, setBuckets];
}
