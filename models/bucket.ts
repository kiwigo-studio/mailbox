import { EmailGroup } from './email';

type Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
};

export type Bucket = {
  id: string;
  name: string;
  region: string;
  credentials: Credentials;
  emailGroups: EmailGroup[];
};
