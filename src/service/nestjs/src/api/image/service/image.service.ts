import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from 'common/database/schema';

@Injectable()
export class ImageService {
	constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {}

	async create() {
		try {
			return await this.imageModel.create({});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async delete(imageId: string) {
		try {
			return await this.imageModel.findByIdAndDelete(imageId);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
