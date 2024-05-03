import '@/styles/globals.css';
import { CssVarsProvider } from '@mui/joy/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider defaultMode="dark">
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
