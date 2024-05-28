import React, { useState } from 'react';
import { EmailGroup } from '@/models/email';
import MailGroupItem, { LoadingMailGroupItem } from './MailGroupItem';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

type Props = {
  emailGroups: EmailGroup[] | null;
  onSelectEmailGroup: (emailGroup: EmailGroup) => void;
};

export default function MailList({ emailGroups, onSelectEmailGroup }: Props) {
  const [selectedEmailID, setSelectedEmailID] = useState<string>('');
  const isSelected = (emailID: string) => emailID === selectedEmailID;

  const handleSelectEmailGroup = (emailGroup: EmailGroup) => {
    onSelectEmailGroup(emailGroup);
    setSelectedEmailID(emailGroup.messageID);
  };

  if (emailGroups === null) {
    return <LoadingMailList />;
  }

  if (emailGroups.length === 0) {
    return <EmptyMailList />;
  }

  return (
    <Sheet
      sx={{
        flex: 1,
        height: '100dvh',
        maxWidth: '300px',
        overflow: 'auto',
        p: 1,
        pr: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={{ pt: 0.5, pb: 1 }}>
        {emailGroups.map(group => (
          <Button
            key={group.messageID}
            variant={isSelected(group.messageID) ? 'solid' : 'plain'}
            sx={{ p: 0, width: '100%' }}
            onClick={() => handleSelectEmailGroup(group)}
          >
            <MailGroupItem key={group.messageID} emailGroup={group} isSelected={isSelected(group.messageID)} />
          </Button>
        ))}
      </Box>
    </Sheet>
  );
}

function LoadingMailList() {
  return (
    <Sheet
      sx={{
        flex: 1,
        height: '100dvh',
        maxWidth: '300px',
        overflow: 'hidden',
        p: 1,
        pr: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={{ pt: 0.5, pb: 1 }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <LoadingMailGroupItem key={index} />
        ))}
      </Box>
    </Sheet>
  );
}

function EmptyMailList() {
  return (
    <Box sx={{ display: 'flex', width: '300px', justifyContent: 'center', alignItems: 'center' }}>
      <Typography level="body-lg" textColor="neutral.500">
        Empty Bucket
      </Typography>
    </Box>
  );
}
