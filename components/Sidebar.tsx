import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import { Bucket } from '@/models/bucket';

type Props = {
  buckets: Bucket[];
  selectedBucketId: string;
  selectBucket: (bucketId: string) => void;
};

export default function Sidebar({ buckets, selectedBucketId, selectBucket }: Props) {
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
        zIndex: 10000,
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
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': theme => theme.vars.radius.sm,
          }}
        >
          {buckets.map(({ id, name }) => (
            <ListItem key={id}>
              <ListItemButton selected={id === selectedBucketId} onClick={() => selectBucket(id)}>
                <ListItemContent>
                  <Typography level="title-sm">{name}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Sheet>
  );
}
