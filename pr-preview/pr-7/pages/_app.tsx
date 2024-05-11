import '@/styles/globals.css';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
