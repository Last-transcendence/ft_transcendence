import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import Document from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'rules',
};
@Schema(schemaOptions)
export class Rule {
	@Prop({
		type: String,
		required: true,
	})
	@ApiProperty({ description: '규칙글의 제목', example: '규칙' })
	title: string;

	@Prop({
		type: [String],
		required: true,
	})
	@ApiProperty({
		description: 'user ',
		example: ['지각시 5만원', '물품 분실시 보관함 확인', '활동 무단 미참여시 제명'],
	})
	content: string[];
}

export type RuleDocument = Rule & Document;
export const RuleSchema = SchemaFactory.createForClass(Rule);
