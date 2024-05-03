import { S3Client, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export async function fetchS3Items(client: S3Client, bucketName: string) {
  const params = {
    Bucket: bucketName,
  };

  try {
    const objectList = await client.send(new ListObjectsCommand(params));
    const objectListContents = objectList.Contents;
    if (objectListContents === undefined) {
      return [];
    }

    const getObjectCmdList = objectListContents
      .sort((a, b) => {
        if (a.LastModified && b.LastModified) {
          return b.LastModified.getTime() - a.LastModified.getTime();
        }
        return 0;
      })
      .map(object => {
        if (object.Key === undefined) {
          return null;
        }
        const getObjectParams = {
          Bucket: bucketName,
          Key: object.Key,
        };
        return client.send(new GetObjectCommand(getObjectParams)).catch(err => {
          console.log(err);
          return null;
        });
      });

    return await Promise.all(getObjectCmdList);
  } catch (err) {
    console.log('Error', err);
  }

  return [];
}
