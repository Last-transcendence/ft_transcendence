import { S3, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
	s3: S3;
	s3Client: S3Client;

	constructor(private readonly configService: ConfigService) {
		this.s3 = new S3({
			region: this.configService.get('S3_REGION'),
			credentials: {
				accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
				secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
			},
		});
		this.s3Client = new S3Client({
			region: this.configService.get('S3_REGION'),
			credentials: {
				accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
				secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
			},
		});
	}

	async getPresignedUrl(imageId: string) {
		try {
			return await createPresignedPost(this.s3Client, {
				Bucket: this.configService.get('S3_BUCKET'),
				Key: imageId,
				Expires: 60, // seconds
				Conditions: [
					['content-length-range', 0, 1024 * 1024 * 10], // 10MB
					['starts-with', '$Content-Type', 'image/'], // image/*
				],
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async delete(keys: string[]) {
		try {
			return this.s3.deleteObjects({
				Bucket: this.configService.get('S3_BUCKET'),
				Delete: {
					Objects: keys.map(key => ({ Key: key })),
				},
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
