import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/Sidebar';
import MailList from '@/components/MailList';
import Content from '@/components/Content';
import { EmailGroup } from '@/models/email';
import { Bucket, BucketData } from '@/models/bucket';
import { useBucketsStore } from '@/stores/bucketStore';
import { fetchAndProcessEmails } from '@/utils/FetchAndProcessEmails';

export default function Home() {
  const [buckets] = useBucketsStore();
  const [bucketData, setBucketData] = useState<BucketData>({});
  const [selectedBucketId, setSelectedBucketId] = useState('');
  const [emailGroups, setEmailGroups] = useState<EmailGroup[]>([]);
  const [selectedEmailGroup, setSelectedEmailGroup] = useState<EmailGroup | null>(null);

  useEffect(() => {
    const newBucketData: BucketData = {};
    let fetchPromises: Promise<[Bucket, EmailGroup[]]>[] = [];
    buckets.forEach(bucket => {
      if (bucketData[bucket.id]) return;
      fetchPromises.push(fetchAndProcessEmails(bucket));
    });

    if (!fetchPromises.length) return;

    Promise.all(fetchPromises).then(results => {
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
      setEmailGroups([]);
    }
    setSelectedEmailGroup(null);
  }, [buckets, bucketData, selectedBucketId]);

  const handleBucketSelect = (bucketId: string) => setSelectedBucketId(bucketId);
  const handleEmailGroupSelect = (emailGroup: EmailGroup) => setSelectedEmailGroup(emailGroup);

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar selectedBucketId={selectedBucketId} selectBucket={handleBucketSelect} />
      <MailList emailGroups={emailGroups} onSelectEmailGroup={handleEmailGroupSelect} />
      <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
      <Content emails={selectedEmailGroup?.emails} />
    </Box>
  );
}
