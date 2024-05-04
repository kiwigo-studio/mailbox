import React, { useState } from 'react';
import { EmailGroup } from '@/models/email';
import MailGroupItem from './MailGroupItem';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

type Props = {
  emailGroups: EmailGroup[];
  onSelectEmailGroup: (emailGroup: EmailGroup) => void;
};

export default function MailList({ emailGroups, onSelectEmailGroup }: Props) {
  const [selectedEmailID, setSelectedEmailID] = useState<string>('');
  const isSelected = (emailID: string) => emailID === selectedEmailID;

  const handleSelectEmailGroup = (emailGroup: EmailGroup) => {
    onSelectEmailGroup(emailGroup);
    setSelectedEmailID(emailGroup.messageID);
  };

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
