import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { registerDecorator, ValidationOptions } from 'class-validator';
import * as dayjs from 'dayjs';

function IsOnlyDate(validationOptions?: ValidationOptions) {
	return function (object: Record<string, any>, propertyName: string) {
		registerDecorator({
			name: 'IsOnlyDate',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: {
				message: 'Please provide only date like 2020-12-08',
				...validationOptions,
			},
			validator: {
				validate(value: any) {
					const regex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;

					return typeof value === 'string' && regex.test(value) && dayjs(value).isValid();
				},
			},
		});
	};
}

export class CreateScheduleDto {
	@IsOnlyDate()
	@IsNotEmpty()
	@ApiProperty({
		example: '2023-09-14',
		type: Date,
	})
	date: Date;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '우동 먹으러 가요',
		type: String,
	})
	title: string;

	@IsString()
	@ApiProperty({
		example: '저녁 6시 수유리 우동에서 봐요',
		type: String,
		required: false,
	})
	description: string;

	@IsString({ each: true })
	@ApiProperty({
		example: ['31fafa4d2ca3608765816679', '79fafa4d2ca3608765825379', '62fafa4d2ca3601867816679'],
		type: [Types.ObjectId],
		required: false,
	})
	attendees: Types.ObjectId[];
}
