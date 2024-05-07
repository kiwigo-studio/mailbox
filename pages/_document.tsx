import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Best mailbox for AWS SES + s3 bucket." />
        <meta name="keyWords" content="S3,AWS,Bucket,Mail,Mailbox,SES" />
        <meta property="og:title" content="Kiwigo Mailbox" />
        <meta property="og:description" content="Best mailbox for AWS SES + s3 bucket" />
        <meta property="og:type" content="website" />
        <meta name="google-site-verification" content="XkD9pdjpDfPgzC-Tvw2amJEl1Z_z6tw7YSHfo1Y8BTc" />
        <link rel="apple-touch-icon" href="./favicon.ico" />
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
