import React from 'react';
import { Attachment, Contact, Email } from '@/models/email';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import DOMPurify from 'dompurify';
import DocumentFileIcon from '@mui/icons-material/DescriptionRounded';
import TextFileIcon from '@mui/icons-material/TextSnippetRounded';
import ImageFileIcon from '@mui/icons-material/ImageRounded';
import PDFFileIcon from '@mui/icons-material/PictureAsPdfRounded';
import DownloadIcon from '@mui/icons-material/DownloadForOfflineRounded';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

type Props = {
  emails?: Email[];
};

export default function Content({ emails }: Props) {
  if (!emails || emails.length === 0) return <EmptyContent />;

  const content = (() => {
    if (emails.length === 1) return <ContentCard email={emails[0]} />;
    return emails.map(email => (
      <Sheet
        key={email.messageId}
        variant="outlined"
        sx={{
          width: '100%',
          backgroundColor: 'transparent',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          mb: 1.5,
          p: 2,
          pt: 1,
          boxShadow: 'xs',
        }}
      >
        <ContentCard email={email} />
      </Sheet>
    ));
  })();

  return (
    <Sheet sx={{ flex: 1, p: 2, width: '100%', height: '100vh', overflow: 'auto', backgroundColor: 'transparent' }}>
      {content}
    </Sheet>
  );
}

function ContentCard({ email }: { email: Email }) {
  const htmlContent = (() => {
    const content = DOMPurify.sanitize(email.html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const links = doc.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.textContent?.startsWith('>')) {
        p.style.color = 'grey';
        p.style.fontStyle = 'italic';
      }
    });

    return doc.documentElement.innerHTML;
  })();

  const dateString = (() => {
    if (!email.date) return '';
    const date = dayjs(email.date);
    const timeString = date.format('HH:mm');

    if (date.isToday()) {
      return timeString;
    } else if (date.isYesterday()) {
      return `Yesterday ${timeString}`;
    }
    return date.format('YYYY/MM/DD') + ` ${timeString}`;
  })();

  const getContactName = ({ name, address }: Contact) => {
    if (name.length > 0) return name;
    else if (address.length > 0) return address;
    else return 'Unknown';
  };

  const fromName = email.from.length > 0 ? getContactName(email.from[0]) : 'Unknown';

  return (
    <Stack spacing={2}>
      <Stack spacing={0}>
        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
          <Typography level="h4">{fromName}</Typography>
          <Typography level="body-sm">{dateString}</Typography>
        </Stack>
        <Typography level="body-lg" textColor="white">
          {email.subject}
        </Typography>
        <Typography
          level="body-sm"
          textColor="white"
          endDecorator={
            <Typography level="body-sm" textColor="neutral.400">
              {email.to.map(getContactName).join(', ')}
            </Typography>
          }
        >
          To:
        </Typography>
        {email.cc.length > 0 && (
          <Typography
            level="body-sm"
            textColor="white"
            endDecorator={
              <Typography level="body-sm" textColor="neutral.400">
                {email.cc.map(getContactName).join(', ')}
              </Typography>
            }
          >
            Cc:
          </Typography>
        )}
      </Stack>
      <div className="html-content-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {email.attachments.length > 0 && (
        <Grid container spacing={1}>
          {email.attachments.map((attachment, index) => (
            <Grid key={index} xs={12} sm={6} lg={4}>
              <AttachmentItem attachment={attachment} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

function AttachmentItem({ attachment }: { attachment: Attachment }) {
  const getIcon = (contentType: string) => {
    switch (contentType) {
      case 'application/pdf':
        return <PDFFileIcon />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
      case 'image/webp':
        return <ImageFileIcon />;
      case 'text/plain':
        return <TextFileIcon />;
      default:
        return <DocumentFileIcon />;
    }
  };

  function downloadAttachment() {
    const blob = new Blob([attachment.content], { type: attachment.contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = attachment.filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        backgroundColor: 'rgb(42,44,44)',
        borderRadius: theme => theme.vars.radius.sm,
        p: 2,
        mt: 2,
      }}
    >
      {getIcon(attachment.contentType)}
      <Typography level="body-xs" textColor="white" sx={{ width: '100%' }}>
        {attachment.filename}
      </Typography>
      <IconButton size="sm" variant="plain" onClick={downloadAttachment}>
        <DownloadIcon />
      </IconButton>
    </Stack>
  );
}

function EmptyContent() {
  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography level="body-lg" textColor="neutral.500">
        No selected email
      </Typography>
    </Box>
  );
}
