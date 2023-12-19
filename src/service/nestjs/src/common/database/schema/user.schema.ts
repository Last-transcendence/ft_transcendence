import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'users',
	autoIndex: true,
};

@Schema(schemaOptions)
export class User {
	@ApiProperty({
		example: '장정안',
		type: String,
	})
	@Prop({
		type: String,
	})
	name: string;

	@ApiProperty({
		example: 'jhanks1221',
		type: String,
		uniqueItems: true,
	})
	@Prop({
		type: String,
		unique: true,
		index: true,
	})
	id: string;

	@ApiProperty({
		example: 'P@ssw0rd!',
		type: String,
	})
	@Prop({
		type: String,
	})
	password: string;

	@ApiProperty({
		example: 'inetty@kookmin.ac.kr',
		type: String,
		uniqueItems: true,
	})
	@Prop({
		type: String,
		unique: true,
		index: true,
	})
	email: string;

	@ApiProperty({
		example: '소프트웨어융합학부',
		type: String,
		required: false,
	})
	@Prop({
		type: String,
		required: false,
	})
	major: string;

	@ApiProperty({
		example: '20191658',
		type: String,
		required: false,
		uniqueItems: true,
	})
	@Prop({
		type: String,
		required: false,
		unique: true,
	})
	studentId: string;

	@ApiProperty({
		example: '010-1234-5678',
		type: String,
		required: false,
	})
	@Prop({
		type: String,
		required: false,
	})
	phoneNumber: string;

	@ApiProperty({
		example: '@j_j.ahn',
		type: String,
		required: false,
	})
	@Prop({
		type: String,
		required: false,
	})
	sns: string;

	@ApiProperty({
		example: '49fafa4d2ca3602935816679',
		type: Types.ObjectId,
		required: false,
		uniqueItems: true,
	})
	@Prop({
		type: Types.ObjectId,
		required: false,
		unique: true,
		sparse: true,
		ref: 'images',
	})
	profileImageId: Types.ObjectId;

	@ApiProperty({
		example: ['37fafa4d2ca3382535816679', '82fafa4d2ca3600165816679'],
		type: Array,
		required: false,
		items: { type: 'Types.ObjectId', uniqueItems: true },
	})
	@Prop({
		type: [Types.ObjectId],
		required: false,
		ref: 'clubs',
	})
	clubs: Types.ObjectId[];

	// 만약 user가 작성한 review를 가지고 있을려면 여기에 object.id 배열이 필요한데 그러면 user생성부터 다 고쳐야할듯. [일단 안건들게]
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
