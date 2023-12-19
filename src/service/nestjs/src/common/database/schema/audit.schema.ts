import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'audits',
};

@Schema(schemaOptions)
export class Audit {
	@Prop({
		type: String,
	})
	@ApiProperty({ description: '작성자', example: '윤현승' })
	auditor: string;

	@Prop({
		type: String,
	})
	@ApiProperty({ description: '작성 일자', example: '2023-09-18' })
	created: string;

	@Prop({
		type: String,
	})
	@ApiProperty({ description: '제목', example: '우동 회식' })
	title: string;

	@Prop({
		type: String,
	})
	@ApiProperty({ description: '일자', example: '2023-09-16' })
	date: string;

	@Prop({
		type: String,
	})
	@ApiProperty({ description: '가맹점', example: '소한마리 정릉점' })
	franchise: string;

	@Prop({
		type: Number,
		required: true,
	})
	@ApiProperty({ description: '금액', example: 200000 })
	amount: number;

	@Prop({
		type: Boolean,
	})
	@ApiProperty({ description: '지출: true, 수입: false', example: true })
	isExpense: boolean;

	@Prop({
		type: Number,
	})
	@ApiProperty({ description: '잔액', example: 800000 })
	balance: number;

	@Prop({
		type: Types.ObjectId,
		ref: 'images',
		unique: true,
	})
	@ApiProperty({ description: '영수증', example: '60f1c1c0c9b0f3a8c0b0b0b0' })
	receiptId: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		ref: 'images',
		unique: true,
	})
	@ApiProperty({ description: '카드 전표', example: '84j2c1c0c9b0f3a8c8e3n0b0' })
	cardSlipId: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		ref: 'images',
		unique: true,
	})
	@ApiProperty({ description: '첨부 사진', example: '38n5c1c0c9b0f8v7r8e3n0b0' })
	attachmentId: Types.ObjectId;

	@Prop({
		type: String,
	})
	@ApiProperty({ description: '비고', example: '우동 회식' })
	remark: string;
}

export type AuditDocument = Audit & Document;

export const AuditSchema = SchemaFactory.createForClass(Audit);
