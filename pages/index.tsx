import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Box from '@mui/joy/Box';
import MailList from '@/components/MailList';
import Content from '@/components/Content';
import { S3Client } from '@aws-sdk/client-s3';
import { fetchS3Items } from '@/utils/ReadFromS3Bucket';
import { parseEmail } from '@/utils/ParseEmail';
import { EmailGroup, newEmailGroupList } from '@/models/email';
import { ParsedMail } from 'mailparser';

export default function Home() {
  const [emailGroups, setEmailGroups] = useState<EmailGroup[]>([]);

  React.useEffect(() => {
    const client = new S3Client({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: '',
        secretAccessKey: '',
      },
    });

    fetchS3Items(client, 'youthgoto-email').then(async items => {
      const emailBodies = await Promise.all(items.map(async item => await item?.Body?.transformToString()));
      const parsedEmails = await Promise.all(
        emailBodies
          .reduce((acc: string[], item) => {
            item && acc.push(item);
            return acc;
          }, [])
          .map(async body => await parseEmail(body)),
      )
        .then(emails =>
          emails.reduce((acc: ParsedMail[], item) => {
            item && acc.push(item);
            return acc;
          }, []),
        )
        .then(emails => newEmailGroupList(emails));

      console.log(parsedEmails);
      setEmailGroups(parsedEmails);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <MailList emailGroups={emailGroups} />
      <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
      <Content />
    </Box>
  );
}
