import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'common/database/schema/user.schema';
import * as bcrypt from 'bcrypt';
import * as AuthDto from '../dto/index';

@Injectable()
export class RegisterService {
	constructor(@InjectModel('User') private userModel: Model<User>) {}

	async register(registerRequestDto: AuthDto.Request.Register): Promise<User> {
		try {
			const { id } = registerRequestDto;
			const user = await this.userModel.findOne({ id });

			if (user) {
				throw new Error('ID already exists');
			}
			registerRequestDto['password'] = await bcrypt.hash(registerRequestDto['password'], 10);
			return await new this.userModel(registerRequestDto).save();
		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}
}
