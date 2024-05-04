import React from 'react';
import { EmailGroup } from '@/models/email';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

type Props = {
  emailGroup: EmailGroup;
  isSelected: boolean;
};

export default function MailGroupItem({ emailGroup, isSelected }: Props) {
  return (
    <Button variant="plain" sx={{ p: 0, width: '100%' }}>
      <Box flexDirection="column" sx={{ px: 2, py: 0.5, width: '100%', display: 'flex' }}>
        <Typography level="title-sm" fontWeight="600" textAlign="left" noWrap>
          {emailGroup.fromName}
        </Typography>
        <Typography level="body-xs" textColor="white" textAlign="left" noWrap>
          {emailGroup.subject}
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            height: '36px',
          }}
          level="body-xs"
          textAlign="left"
        >
          {emailGroup.text}
        </Typography>
      </Box>
    </Button>
  );
}
