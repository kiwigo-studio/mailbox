import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Best mailbox for AWS SES + s3 bucket." />
        <meta name="google-site-verification" content="XkD9pdjpDfPgzC-Tvw2amJEl1Z_z6tw7YSHfo1Y8BTc" />
        <link
          rel="icon"
          type="image/png"
          href="https://raw.githubusercontent.com/kiwigo-studio/mailbox/master/public/favicon.png"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
