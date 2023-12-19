import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from 'common/database/schema/review.schema';
import { Model, Types } from 'mongoose';
import { CreateReviewDTO } from '../dto/request/createReview.dto';

@Injectable()
export class ReviewsService {
	constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

	async create(createReviewDto: CreateReviewDTO): Promise<Review> {
		try {
			return await this.reviewModel.create(createReviewDto);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async getReviewById(reviewId: Types.ObjectId): Promise<Review> {
		try {
			return await this.reviewModel.findById(reviewId).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteReview(reviewId: string | Types.ObjectId): Promise<Review> {
		try {
			const deletedReview = await this.reviewModel.findByIdAndRemove({ _id: reviewId }).exec();
			return deletedReview;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async updateReview(
		reviewId: string | Types.ObjectId,
		updateData: Partial<CreateReviewDTO>,
	): Promise<Review | null> {
		try {
			return await this.reviewModel.findByIdAndUpdate(reviewId, updateData, { new: true });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
