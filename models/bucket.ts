import z from 'zod';
import { EmailGroup } from './email';
import { v4 as uuid } from 'uuid';

export const BucketSchema = z.object({
  id: z.string().default(() => uuid()),
  name: z.string().min(1),
  region: z.string().min(1),
  credentials: z.object({
    accessKeyId: z.string().min(1),
    secretAccessKey: z.string().min(1),
  }),
});

export type Bucket = z.infer<typeof BucketSchema>;

export type BucketData = { [key: string]: EmailGroup[] };
