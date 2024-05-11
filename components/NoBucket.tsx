import React from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import BucketForm from './BucketForm';
import { Bucket } from '@/models/bucket';
import LaunchIcon from '@mui/icons-material/LaunchRounded';

export default function NoBucket({ onCreate }: { onCreate: (bucket: Bucket) => void }) {
  const router = useRouter();

  return (
    <Stack className="flex justify-center items-center w-full flex-col" spacing={2}>
      <Typography level="h3">Add a bucket</Typography>
      <BucketForm withoutCancel editBucket={null} onSubmit={onCreate} handleClose={() => {}} />
      <Divider className="self-center" sx={{ width: '280px' }}>
        OR
      </Divider>
      <Button
        component="a"
        color="primary"
        variant="soft"
        target="_blank"
        size="sm"
        href={router.basePath + '/demo'}
        endDecorator={<LaunchIcon fontSize="small" />}
        sx={{ width: '280px' }}
      >
        Explore Demo
      </Button>
    </Stack>
  );
}
