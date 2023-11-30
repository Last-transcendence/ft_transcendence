import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './service/image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from 'common/database/schema';
import { S3Service } from './service/s3.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],
	controllers: [ImageController],
	providers: [ImageService, S3Service],
	exports: [ImageService, S3Service],
})
export class ImageModule {}
