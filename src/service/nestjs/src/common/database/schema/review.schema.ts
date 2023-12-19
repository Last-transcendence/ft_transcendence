import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'reviews',
};

@Schema(schemaOptions)
export class Review {
	// club에서만 review_id 를 참조하면 되나? 굳이 review에서 club 참조?
	// -> 흠 일단 club에서만 해보는걸로

	//@Prop({
	//	type: String,
	//	ref: 'clubs',
	//	required: true,
	//	unique: true,
	//})
	//@ApiProperty({ description: 'club ID', example: '650aae123f1ac83686bbd50a' })
	//clubId: string;

	@Prop({
		type: String,
		ref: 'users',
		required: false,
		unique: true,
	})
	@ApiProperty({ description: 'user ID', example: '6aae123f1ac836bbd50a' })
	userId: string;

	@Prop({
		type: String,
		required: true,
	})
	@ApiProperty({ description: '내용', example: '동아리가 너무 활동적이고 재밌어요!!' })
	content: string;

	//@Prop({
	//	type: [String],
	//	required: false,
	//})
	//@ApiProperty({ description: 'tag', example: ['#운동', '#재미', '#가족같은분위기'] })
	//tags: string[];

	@Prop({
		type: Number,
		required: true,
	})
	@ApiProperty({ description: '평점', example: 5 })
	rating: number;
}

export type ReviewDocument = Review & Document;

export const ReviewSchema = SchemaFactory.createForClass(Review);
