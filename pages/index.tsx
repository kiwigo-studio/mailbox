import React from 'react';
import Sidebar from '@/components/Sidebar';
import Box from '@mui/joy/Box';
import MailList from '@/components/MailList';
import Content from '@/components/Content';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <MailList />
      <div style={{ backgroundColor: 'black', height: '100vh', width: 1 }} />
      <Content />
    </Box>
  );
}
