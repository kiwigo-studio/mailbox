import z from 'zod';
import { EmailGroup } from './email';
import { randomUUID } from 'crypto';

export const BucketSchema = z.object({
  id: z.string().default(randomUUID),
  name: z.string(),
  region: z.string(),
  credentials: z.object({
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
  }),
});

export type Bucket = z.infer<typeof BucketSchema>;

export type BucketData = { [key: string]: EmailGroup[] };
