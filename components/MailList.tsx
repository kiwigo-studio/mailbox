import React from 'react';
import { EmailGroup } from '@/models/email';
import MailGroupItem from './MailGroupItem';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';

type Props = {
  emailGroups: EmailGroup[];
};

export default function MailList({ emailGroups }: Props) {
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
          <MailGroupItem key={group.messageID} emailGroup={group} isSelected={false} />
        ))}
      </Box>
    </Sheet>
  );
}
