<p align="center">
  <img src="https://raw.githubusercontent.com/kiwigo-studio/mailbox/master/public/favicon.ico" width="100" alt="project-logo">
</p>
<p align="center">
<h1 align="center">Kiwigo Mailbox </h1>
</p>

![Github Actions Status](https://github.com/kiwigo-studio/mailbox/actions/workflows/nextjs.yml/badge.svg) ![License: GPL-3.0](https://img.shields.io/github/license/kiwigo-studio/mailbox)

[Website](https://kiwigo-studio.github.io/mailbox/)｜[Demo](https://kiwigo-studio.github.io/mailbox/demo)

Kiwigo Mailbox is a web application that supports to read emails from multiple AWS S3 buckets.

## Features

- Read emails from AWS S3 bucket

#### Roadmap

- [ ] Add email search functionality
- [ ] Add email filter functionality
- [ ] Add loading ui when fetching emails
- [ ] Fetch email pagination
- [ ] Save bucket configuration to cloud

## Getting Started

There are several steps to start using Kiwigo Mailbox:

1. Create a S3 bucket in AWS.
2. Create credentials of read access for the bucket.
3. Setting [CORS configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html) for the bucket.

IAM policy granting read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowBucketRead",
      "Effect": "Allow",
      "Action": ["s3:listBucket", "s3:getObject"],
      "Resource": ["arn:aws:s3:::<your_bucket_name>", "arn:aws:s3:::<your_bucket_name>/*"]
    }
  ]
}
```

A sample CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

You can store emails in an S3 bucket in any way you choose, or you might consider using the [AWS SES](https://docs.aws.amazon.com/ses/latest/dg/receiving-email.html) for better integration.

## Contributing To Kiwigo Mailbox

We warmly welcome contributions from everyone and are grateful for every kind of contribution, not just code, but also bug reports, documentation, and feedback. We are happy to help you with any questions you might have, and we highly appreciate any kind of feedback.
