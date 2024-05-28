import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/Sidebar';
import MailList from '@/components/MailList';
import Content from '@/components/Content';
import NoBucket from '@/components/NoBucket';
import { EmailGroup } from '@/models/email';
import { Bucket, BucketData } from '@/models/bucket';
import { useBucketsStore } from '@/stores/bucketStore';
import { fetchAndProcessEmails } from '@/utils/FetchAndProcessEmails';

export default function Home() {
  const [buckets, setBuckets] = useBucketsStore();
  const [bucketData, setBucketData] = useState<BucketData>({});
  const [selectedBucketId, setSelectedBucketId] = useState('');
  const [emailGroups, setEmailGroups] = useState<EmailGroup[] | null>(null);
  const [selectedEmailGroup, setSelectedEmailGroup] = useState<EmailGroup | null>(null);

  useEffect(() => {
    if (buckets.length === 0) {
      setSelectedBucketId('');
      setBucketData({});
      return;
    }

    let fetchPromises: Promise<[Bucket, EmailGroup[]]>[] = [];
    buckets.forEach(bucket => {
      if (bucketData[bucket.id]) return;
      fetchPromises.push(fetchAndProcessEmails(bucket));
    });

    if (!fetchPromises.length) return;

    Promise.all(fetchPromises).then(results => {
      const newBucketData: BucketData = {};
      results.forEach(([bucket, emailGroup]) => {
        newBucketData[bucket.id] = emailGroup;
      });
      setBucketData(pre => ({ ...pre, ...newBucketData }));
    });
  }, [buckets, bucketData]);

  useEffect(() => {
    const selectedBucketEmailGroups = bucketData[selectedBucketId];
    if (selectedBucketEmailGroups) {
      setEmailGroups(selectedBucketEmailGroups);
    } else {
      setEmailGroups(null);
    }
    setSelectedEmailGroup(null);
  }, [buckets, bucketData, selectedBucketId]);

  const handleBucketSelect = (bucketId: string) => setSelectedBucketId(bucketId);
  const handleEmailGroupSelect = (emailGroup: EmailGroup) => setSelectedEmailGroup(emailGroup);

  const handleBucketChange = (bucket: Bucket) => {
    setBuckets(pre => {
      const newBuckets = [...pre];
      const index = newBuckets.findIndex(b => b.id === bucket.id);
      if (index === -1) {
        newBuckets.push(bucket);
      } else {
        newBuckets[index] = bucket;
      }
      return newBuckets;
    });
  };

  const handleBucketDelete = (bucketId: string) => {
    setBuckets(pre => pre.filter(b => b.id !== bucketId));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Head>
        <title>Kiwigo Mailbox｜Best Webmail Client for AWS SES and S3 Buckets</title>
      </Head>
      <Sidebar
        buckets={buckets}
        selectedBucketId={selectedBucketId}
        selectBucket={handleBucketSelect}
        onBucketChange={handleBucketChange}
        onBucketDelete={handleBucketDelete}
      />
      {buckets.length !== 0 && (
        <>
          <MailList emailGroups={emailGroups} onSelectEmailGroup={handleEmailGroupSelect} />
          <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
          <Content emails={selectedEmailGroup?.emails} />
        </>
      )}
      {buckets.length === 0 && <NoBucket onCreate={handleBucketChange} />}
    </Box>
  );
}
