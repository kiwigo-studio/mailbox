import React from 'react';
import { Bucket, BucketSchema } from '@/models/bucket';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { s3Region } from '@/models/s3Region';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useBucketsStore } from '@/stores/bucketStore';

type Props = {
  editBucket: Bucket | null;
  onSubmit: () => void;
};

const width = '100%';

export default function BucketForm({ editBucket, onSubmit }: Props) {
  const [_, setBuckets] = useBucketsStore();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<Bucket>({
    defaultValues: editBucket ?? undefined,
    resolver: zodResolver(BucketSchema),
    mode: 'onChange',
  });

  let defaultRegion: (typeof s3Region)[number] | undefined = undefined;
  if (editBucket) {
    defaultRegion = s3Region.find(region => region.region === editBucket.region);
    console.log(defaultRegion);
  }

  const onSubmitHandler = handleSubmit(data => {
    if (editBucket) {
      setBuckets(buckets => {
        const index = buckets.findIndex(bucket => bucket.id === editBucket.id);
        if (index === -1) {
          return buckets;
        }
        const newBuckets = [...buckets];
        newBuckets[index] = data;
        return newBuckets;
      });
    } else {
      setBuckets(buckets => [...buckets, data]);
    }
    onSubmit();
  });

  return (
    <Stack component="form" autoComplete="off" onSubmit={onSubmitHandler} spacing={2}>
      <FormControl>
        <FormLabel>Bucket region</FormLabel>
        <Autocomplete
          placeholder="Region Name or ID"
          options={s3Region}
          defaultValue={defaultRegion}
          getOptionLabel={option => option.regionName}
          getOptionKey={option => option.region}
          sx={{ width }}
          filterOptions={(options, params) =>
            options.filter(
              option =>
                option.region.toLowerCase().includes(params.inputValue.toLowerCase()) ||
                option.regionName.toLowerCase().includes(params.inputValue.toLowerCase()),
            )
          }
          onChange={(_, value) => {
            setValue('region', value?.region ?? '');
            trigger('region');
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Bucket Name</FormLabel>
        <Input sx={{ width }} {...register('name')} />
      </FormControl>
      <FormControl>
        <FormLabel>Access Key ID</FormLabel>
        <Input
          type="password"
          slotProps={{
            input: {
              autoComplete: 'off',
            },
          }}
          sx={{ width }}
          {...register('credentials.accessKeyId')}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Secret Access Key</FormLabel>
        <Input
          type="password"
          slotProps={{
            input: {
              autoComplete: 'false',
            },
          }}
          sx={{ width }}
          {...register('credentials.secretAccessKey')}
        />
      </FormControl>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="neutral" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid} color="primary">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
