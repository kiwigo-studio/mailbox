import React, { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import Sidebar from '@/components/Sidebar';
import MailList from '@/components/MailList';
import Content from '@/components/Content';
import { EmailGroup } from '@/models/email';
import { demoBucket, demoEmailGroups } from '@/models/demo';

export default function Demo() {
  const [selectedEmailGroup, setSelectedEmailGroup] = useState<EmailGroup | null>(null);

  const handleBucketChange = () => {};

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Head>
        <title>Demo｜Kiwigo Mailbox</title>
      </Head>
      <Sidebar
        buckets={[demoBucket]}
        selectedBucketId={demoBucket.id}
        selectBucket={() => {}}
        onBucketChange={handleBucketChange}
        onBucketDelete={handleBucketChange}
      />
      <MailList emailGroups={demoEmailGroups} onSelectEmailGroup={setSelectedEmailGroup} />
      <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
      <Content emails={selectedEmailGroup?.emails} />
      <Snackbar
        open
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography>This is a Demo page.</Typography>
        <Button component="a" href="/">
          Leave
        </Button>
      </Snackbar>
    </Box>
  );
}
