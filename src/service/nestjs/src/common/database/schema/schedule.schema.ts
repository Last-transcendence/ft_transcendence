import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'schedules',
};

@Schema(schemaOptions)
export class Schedule {
	@ApiProperty({
		example: '2023-09-14',
		type: Date,
	})
	@Prop({
		type: Date,
	})
	date: string;

	@ApiProperty({
		example: '우동 먹으러 가요',
		type: String,
	})
	@Prop({
		type: String,
	})
	title: string;

	@ApiProperty({
		example: '저녁 6시 수유리 우동에서 봐요',
		type: String,
		required: false,
	})
	@Prop({
		type: String,
	})
	description: string;

	@ApiProperty({
		example: ['31fafa4d2ca3608765816679', '79fafa4d2ca3608765825379', '62fafa4d2ca3601867816679'],
		type: [Types.ObjectId],
	})
	@Prop({
		type: [Types.ObjectId],
		ref: 'users',
		required: false,
	})
	attendees: Types.ObjectId[];
}

export type ScheduleDocument = Schedule & Document;

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
