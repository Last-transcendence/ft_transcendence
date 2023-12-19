import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

export class CreateAuditDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: '작성자', example: '윤현승' })
	auditor: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: '작성일자', example: '2023-10-29' })
	created: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: '제목', example: '알파 프로젝트 회식' })
	title: string;

	@IsOnlyDate()
	@IsNotEmpty()
	@ApiProperty({ description: '날짜', example: '2023-09-18' })
	date: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: '가맹점', example: '소한마리 정릉점' })
	franchise: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ description: '금액', example: 200000 })
	amount: number;

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty({ description: '지출: true, 수입: false', example: true })
	isExpense: boolean;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ description: '잔액', example: 800000 })
	balance: number;

	@IsNotEmpty()
	@ApiProperty({ description: '영수증 ID', example: '5f9e9d0f4b9a3e1e4c7b6a9d' })
	receiptId: Types.ObjectId;

	//@IsNotEmpty()
	@IsOptional()
	@IsString()
	@ApiProperty({ description: '카드 전표 ID', example: '5f9e9d0f4b9a3e1e4c7b6a9d' })
	cardSlipId: Types.ObjectId;

	@IsOptional()
	@IsString()
	@ApiProperty({ description: '첨부 사진 ID', example: '5f9e9d0f4b9a3e1e4c7b6a9d' })
	attachmentId: Types.ObjectId;

	@IsOptional()
	@IsString()
	@ApiProperty({ description: '비고', example: '냉면 3000원 할인' })
	remark: string;
}
