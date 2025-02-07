import React, { useState, useEffect } from 'react';
import { Bucket } from '@/models/bucket';
import { useBucketsStore } from '@/stores/bucketStore';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import SvgIcon from '@mui/joy/SvgIcon';
import AddCircleIcon from '@mui/icons-material/AddCircleRounded';
import SettingIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/RemoveCircleRounded';
import BucketFormModal from './BucketFormModal';

type Props = {
  buckets: Bucket[];
  selectedBucketId: string;
  selectBucket: (bucketId: string) => void;
  onBucketChange: (bucket: Bucket) => void;
  onBucketDelete: (bucketId: string) => void;
};

export default function Sidebar(props: Props) {
  const { buckets, selectedBucketId } = props;
  const { selectBucket, onBucketChange, onBucketDelete } = props;
  const [settingMode, setSettingMode] = useState(false);
  const [showBucketForm, setShowBucketForm] = useState(false);
  const [editBucket, setEditBucket] = useState<Bucket | null>(null);

  useEffect(() => {
    if (buckets.length === 0) return;

    if (!selectedBucketId || selectedBucketId === '' || !buckets.find(b => b.id === selectedBucketId)) {
      selectBucket(buckets[0].id);
    }
  }, [buckets, selectedBucketId, selectBucket]);

  const handleAddClick = () => {
    setShowBucketForm(true);
    setEditBucket(null);
  };

  const handleSettingClick = () => {
    setSettingMode(true);
  };

  const handleDoneClick = () => {
    setSettingMode(false);
  };

  const handleBucketClick = (bucket: Bucket) => {
    if (!settingMode) {
      selectBucket(bucket.id);
      return;
    }
    setShowBucketForm(true);
    setEditBucket(bucket);
  };

  const handleDeleteClick = (bucket: Bucket) => {
    if (!confirm(`Are you sure to delete ${bucket.name}?`)) return;
    onBucketDelete(bucket.id);
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        display: { xs: 'none', md: 'flex' },
        zIndex: 999,
        height: 'calc(100vh - 16px)',
        width: '200px',
        top: 0,
        p: 1,
        m: '8px',
        flexShrink: 0,
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'rgb(38, 39, 39)',
        borderRadius: theme => theme.vars.radius.sm,
      }}
    >
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        {!settingMode && (
          <Box display="flex" justifyContent="space-between">
            <IconButton size="sm" onClick={handleAddClick}>
              <AddCircleIcon />
            </IconButton>
            <IconButton size="sm" onClick={handleSettingClick}>
              <SettingIcon />
            </IconButton>
          </Box>
        )}
        {settingMode && (
          <Button size="sm" onClick={handleDoneClick}>
            <Typography level="title-sm">Done</Typography>
          </Button>
        )}
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': theme => theme.vars.radius.sm,
          }}
        >
          {buckets.map(bucket => (
            <ListItem
              key={bucket.id}
              startAction={
                settingMode && (
                  <IconButton color="danger" size="sm" onClick={() => handleDeleteClick(bucket)}>
                    <DeleteIcon color="error" sx={{ width: '18px', height: '18px' }} />
                  </IconButton>
                )
              }
            >
              <ListItemButton
                selected={bucket.id === selectedBucketId && !settingMode}
                onClick={() => handleBucketClick(bucket)}
              >
                <ListItemContent>
                  <Stack direction="row" justifyContent="space-between" spacing={1}>
                    <Typography
                      level="title-sm"
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                      }}
                    >
                      {bucket.name}
                    </Typography>
                    {settingMode && <EditIcon />}
                  </Stack>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Link
        href="https://github.com/kiwigo-studio/mailbox"
        underline="none"
        target="_blank"
        rel="noopener"
        sx={{ justifyContent: 'center' }}
      >
        <SvgIcon
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            width: '14px',
            height: '14px',
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(32)"
            fill="#FFFFFF"
          />
        </SvgIcon>
        <Typography level="title-sm" fontWeight="bold">
          &nbsp;&nbsp;Contribute
        </Typography>
      </Link>
      <BucketFormModal
        open={showBucketForm}
        onSubmit={onBucketChange}
        setOpen={setShowBucketForm}
        editBucket={editBucket}
      />
    </Sheet>
  );
}
