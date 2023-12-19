import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'clubs',
};
@Schema(schemaOptions)
export class Club {
	@ApiProperty({ description: '동아리 이름', example: '윙크', uniqueItems: true })
	@Prop({
		type: String,
		unique: true,
		index: true,
	})
	name: string;

	@ApiProperty({ description: '동아리 소개글', example: '우리 동아리 짱짱!!', required: false })
	@Prop({ type: String })
	introduction: string;

	@ApiProperty({ description: '동아리 규칙', example: '담배, 술 X', required: false })
	@Prop({
		type: [Types.ObjectId],
		required: false,
	})
	rules: Types.ObjectId[];

	@ApiProperty({
		description: '동아리 태그 배열',
		example: ['#스터디', '#가족같은 분위기'],
		required: false,
	})
	@Prop({ type: [String] })
	tags: string[]; // enum을 사용해서 문자열에 이름을 주기?

	@ApiProperty({ description: '동아리 member들 정보', required: false })
	@Prop({
		type: [Types.ObjectId], // Member를 사용하면 에러남;; 지원하지 않는 mongoose schema?
		required: false,
		ref: 'members',
	})
	members: Types.ObjectId[];

	@ApiProperty({ description: '동아리 일정', required: false })
	@Prop({
		type: [Types.ObjectId],
		required: false,
		ref: 'schedules',
	})
	schedules: Types.ObjectId[];

	@ApiProperty({ description: '전체 공금', required: false })
	@Prop({
		type: Number,
		required: false,
	})
	totalBudget: number;

	@ApiProperty({ description: '현재 공금', required: false })
	@Prop({
		type: Number,
		required: false,
	})
	balance: number;

	@ApiProperty({ description: '동아리 회계 문서', required: false })
	@Prop({
		type: [Types.ObjectId],
		required: false,
		ref: 'audits',
	})
	audits: Types.ObjectId[];

	@Prop({
		type: [Types.ObjectId],
		ref: 'reviews',
		required: false,
	})
	@ApiProperty({ description: 'reviews id' })
	reviews: Types.ObjectId[];
}

export type ClubDocument = Club & Document;

export const ClubSchema = SchemaFactory.createForClass(Club);
