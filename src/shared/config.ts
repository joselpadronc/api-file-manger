import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      dbHost: process.env.DATABASE_HOST,
      dbPort: process.env.DATABASE_PORT,
      dbName: process.env.DATABASE_NAME,
      dbUser: process.env.DATABASE_USER,
      dbPassword: process.env.DATABASE_PASSWORD,
    },
    s3Bucket: {
      s3Key: process.env.S3_Key,
      s3Secret: process.env.S3_SECRET,
      s3Bucket: process.env.S3_BUCKET,
    },
    jwtKey: process.env.JWT_KEY,
  };
});
