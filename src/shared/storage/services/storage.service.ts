import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import config from 'src/shared/config';

@Injectable()
export class StorageService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private AWS_S3_BUCKET = this.configService.s3Bucket.s3Bucket;
  private s3 = new AWS.S3({
    accessKeyId: this.configService.s3Bucket.s3Key,
    secretAccessKey: this.configService.s3Bucket.s3Secret,
  });

  async uploadFile(file) {
    const fileExtension = file.mimetype.split('/')[1];
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${uuidv4()}.${fileExtension}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async downloadFile(fileName: string) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: fileName,
    };

    try {
      const s3Response = await this.s3.getObject(params).createReadStream();

      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
