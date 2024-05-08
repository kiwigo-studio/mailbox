import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import BucketForm from './BucketForm';
import { Bucket } from '@/models/bucket';

export default function NoBucket({ onCreate }: { onCreate: (bucket: Bucket) => void }) {
  return (
    <Box className="flex justify-center items-center w-full flex-col">
      <Typography level="h3" className="mb-10">
        Add a bucket
      </Typography>
      <BucketForm withoutCancel editBucket={null} onSubmit={onCreate} handleClose={() => {}} />
    </Box>
  );
}
