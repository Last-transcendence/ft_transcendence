import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'common/database/schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async updateMe(userId: string, updateData: Partial<User>): Promise<User> {
		try {
			return await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async updatePassword(userId: string, newPassword: string): Promise<User> {
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			return await this.userModel.findByIdAndUpdate(
				userId,
				{ password: hashedPassword },
				{ new: true },
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findByObjectId(_id: string): Promise<User> {
		try {
			return await this.userModel.findById(_id);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findById(id: string): Promise<User> {
		try {
			return await this.userModel.findOne({ id });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findByEmail(email: string): Promise<User> {
		try {
			return await this.userModel.findOne({ email });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async setProfileImage(userId: Types.ObjectId, profileImageId: Types.ObjectId): Promise<User> {
		try {
			return await this.userModel.findByIdAndUpdate(userId, { profileImageId }, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
