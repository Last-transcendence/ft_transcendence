import { Controller, Delete, HttpException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/auth/guard';
import { Response } from 'express';
import { ImageService } from './service/image.service';
import { S3Service } from './service/s3.service';

@Controller('image')
@ApiTags('image')
export class ImageController {
	constructor(
		private readonly imageService: ImageService,
		private readonly s3Service: S3Service,
	) {}

	@Post('/presigned/:path')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get presigned url to upload image' })
	@ApiResponse({ status: 200, description: 'Get presigned url to upload image' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getPresignedUrl(@Param('path') path: string) {
		try {
			const validPath = ['profile', 'receipt', 'card-slip', 'attachment'];
			if (!path || !validPath.includes(path)) {
				throw new HttpException('Bad Request', 400);
			}

			const image = await this.imageService.create();
			const presignedUrl = await this.s3Service.getPresignedUrl(
				path + '/raw/' + image._id.toString(),
			);

			return presignedUrl;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete('/:iid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete image' })
	@ApiResponse({ status: 200, description: 'Delete image' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async delete(@Param('iid') imageId: string, @Res({ passthrough: true }) response: Response) {
		try {
			this.imageService.delete(imageId);
			this.s3Service.delete([imageId]);

			return response.status(200).json({
				message: 'Delete image successfully',
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
