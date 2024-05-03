import React from 'react';
import Sidebar from '@/components/Sidebar';
import Box from '@mui/joy/Box';
import MailList from '@/components/MailList';
import Content from '@/components/Content';
import { S3Client } from '@aws-sdk/client-s3';
import { fetchS3Items } from '@/utils/ReadFromS3Bucket';
import { parseEmail } from '@/utils/ParseEmail';

export default function Home() {
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
        emailBodies.map(async emailBody => {
          if (emailBody === undefined) {
            return null;
          }
          return await parseEmail(emailBody);
        }),
      );
      console.log(parsedEmails);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <MailList />
      <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
      <Content />
    </Box>
  );
}
