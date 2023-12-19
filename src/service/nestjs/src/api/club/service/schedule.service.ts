import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'common/database/schema/schedule.schema';
import { Model, Types } from 'mongoose';
import { CreateScheduleDto } from '../dto/request/schedule.dto';
import * as ClubDto from '../dto/index';

@Injectable()
export class ScheduleService {
	constructor(@InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>) {}

	async createSchedule(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
		try {
			return await this.scheduleModel.create(createScheduleDto);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async getAllSchedulesForTheMonth(
		scheduleIds: Types.ObjectId[],
		month: number,
	): Promise<Schedule[]> {
		try {
			const year = new Date().getFullYear();

			return await this.scheduleModel
				.find({
					_id: { $in: scheduleIds },
					date: {
						$gte: new Date(`${year}-${month}-01`),
						$lt: new Date(`${year}-${month + 1}-01`),
					},
				})
				.exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async getScheduleById(scheduleId: string | Types.ObjectId): Promise<Schedule> {
		try {
			return await this.scheduleModel.findById(scheduleId).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async updateSchedule(
		scheduleId: string | Types.ObjectId,
		updateData: Partial<ClubDto.Request.CreateScheduleDto>,
	): Promise<Schedule> {
		try {
			return await this.scheduleModel.findByIdAndUpdate(scheduleId, updateData, { new: true });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteSchedule(scheduleId: string | Types.ObjectId) {
		try {
			return await this.scheduleModel.findByIdAndDelete(scheduleId);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
