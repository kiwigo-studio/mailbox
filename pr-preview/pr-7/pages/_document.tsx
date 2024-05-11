import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Discover the best open-source webmail client optimized for managing emails stored on AWS S3 buckets. Seamlessly integrate with multiple S3 email accounts using AWS SES"
        />
        <meta
          name="keywords"
          content="Kiwigo Mailbox, best webmail client, AWS SES, S3 bucket email, open source webmail, free webmail client, S3 email storage, multiple S3 mailboxes"
        />
        <link rel="canonical" href="https://kiwigo-studio.github.io/mailbox/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kiwigo Mailbox｜Best webmail client for AWS SES + s3 bucket" />
        <meta
          property="og:description"
          content="Explore the leading open-source webmail client designed for AWS SES and S3. Manage multiple S3 email accounts effortlessly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiwigo-studio.github.io/mailbox/" />
        <meta property="og:image" content="https://kiwigo-studio.github.io/mailbox/banner.jpg" />
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
