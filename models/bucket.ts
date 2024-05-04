import { EmailGroup } from './email';

type Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

export type Bucket = {
  name: string;
  region: string;
  credentials: Credentials;
  emailGroups: EmailGroup[];
};
