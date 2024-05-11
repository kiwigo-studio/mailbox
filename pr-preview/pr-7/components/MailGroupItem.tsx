import React from 'react';
import { EmailGroup } from '@/models/email';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExpandCircleIcon from '@mui/icons-material/ExpandCircleDownOutlined';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

type Props = {
  emailGroup: EmailGroup;
  isSelected: boolean;
};

export default function MailGroupItem({ emailGroup, isSelected }: Props) {
  const handleDatetimeString = (d?: Date): string => {
    if (!d) return '';
    const date = dayjs(d);
    const aWeekAgo = dayjs().subtract(7, 'day');

    if (date.isToday()) {
      return date.format('HH:mm');
    } else if (date.isYesterday()) {
      return 'Yesterday';
    } else if (date.isAfter(aWeekAgo)) {
      return date.format('dddd');
    }
    return date.format('YYYY/MM/DD');
  };

  return (
    <Box flexDirection="column" sx={{ px: 2, py: 0.75, width: '100%', display: 'flex' }}>
      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
        <Typography level="title-sm" fontWeight="600" textAlign="left" noWrap>
          {emailGroup.fromName}
        </Typography>
        <Typography level="body-xs">{handleDatetimeString(emailGroup.date)}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
        <Typography level="body-xs" textColor="white" textAlign="left" noWrap>
          {emailGroup.subject}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {emailGroup.hasAttachment && (
            <AttachFileIcon
              sx={{
                w: '16px',
                height: '16px',
                transform: 'rotate(45deg)',
                color: isSelected ? 'white' : 'neutral.400',
              }}
            />
          )}
          {emailGroup.emails.length > 1 && (
            <Stack direction="row" alignItems="center" spacing={0}>
              <Typography level="body-xs" textColor="primary.300">
                {emailGroup.emails.length}
              </Typography>
              <ExpandCircleIcon sx={{ w: '14px', height: '14px', color: 'primary.300', transform: 'rotate(-90deg)' }} />
            </Stack>
          )}
        </Stack>
      </Stack>
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
  );
}
