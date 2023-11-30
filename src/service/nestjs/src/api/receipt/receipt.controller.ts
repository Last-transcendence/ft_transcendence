import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReceiptRequestDto } from './dto/request/receipt.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';

@Controller('receipt')
@ApiTags('receipt')
export class receiptController {
	constructor(private readonly httpService: HttpService) {}

	// 영수증 테스트를 위한 API
	// form-data 형식으로 imageId를 receipt AI flask server로 전달
	@Post()
	async receipt(@Body() receiptRequestDto: ReceiptRequestDto) {
		try {
			const axiosRequestConfig: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const formData = new FormData();

			formData.append('imageId', receiptRequestDto.imageId.toString());
			return await lastValueFrom(
				this.httpService.post('http://receipt:5000/receipt', formData, axiosRequestConfig).pipe(
					map(response => {
						return response?.data;
					}),
					catchError(error => {
						throw new HttpException(error.message, error.status);
					}),
				),
			);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
