import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { AWSKEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class S3Service {

  private readonly s3: S3;

  constructor() {
    console.log('s3 생성자 호출');
    this.s3 = new S3(AWSKEY);
  }

  public upload(bucket: string, file: File) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
      };
      this.s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(new Error('업로드 에러'));
        }
        resolve(data);
      });
    });
  }
}
