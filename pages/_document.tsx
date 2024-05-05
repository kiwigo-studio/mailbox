import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Best mailbox for AWS SES + s3 bucket." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
