import { S3Client } from '@aws-sdk/client-s3';
import { fetchS3Items } from './ReadFromS3Bucket';
import { parseEmail } from './ParseEmail';
import { Bucket } from '@/models/bucket';
import { EmailGroup, newEmailGroupList } from '@/models/email';
import { ParsedMail } from 'mailparser';

export async function fetchAndProcessEmails(config: Bucket): Promise<[Bucket, EmailGroup[]]> {
  const client = new S3Client({
    region: config.region,
    credentials: config.credentials,
  });

  try {
    const items = await fetchS3Items(client, config.name);
    const emails = await Promise.all(
      items.map(async item => {
        const body = await item?.Body?.transformToString();
        return body ? parseEmail(body) : null;
      }),
    );

    const nonNullEmails = emails.reduce((acc: ParsedMail[], item) => {
      item && acc.push(item);
      return acc;
    }, []);

    const emailGroup = newEmailGroupList(nonNullEmails);
    return [config, emailGroup];
  } catch (error) {
    console.error('Error processing emails:', error);
    return [config, []];
  }
}
