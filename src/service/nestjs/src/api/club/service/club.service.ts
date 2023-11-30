import { Model, Types } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Club } from 'common/database/schema/club.schema';
import { CreateClubDTO } from '../dto/request/createClub.dto';

@Injectable()
export class ClubsService {
	constructor(@InjectModel(Club.name) private clubModel: Model<Club>) {}

	async create(createClubDto: CreateClubDTO): Promise<Club> {
		const createdClub = new this.clubModel(createClubDto);
		if (!createdClub) {
			throw new HttpException('Bad Request', 400);
		}

		return createdClub.save();
	}

	async findAll(): Promise<Club[]> {
		return await this.clubModel.find().exec();
	}

	async findClubById(id: Types.ObjectId | string): Promise<Club> {
		const club = await this.clubModel.findById(id).exec();
		if (!club) {
			throw new HttpException('Not Found', 404);
		}

		return club;
	}

	async searchByName(name: string): Promise<Club[]> {
		const club = this.clubModel.find({ name }).exec();
		if (!club) {
			throw new HttpException('Not Found', 404);
		}

		return club;
	}

	async update(clubId: string, updateData: Partial<Club>): Promise<Club | null> {
		const updatedClub = this.clubModel.findByIdAndUpdate(clubId, updateData, { new: true }).exec();
		if (!updatedClub) {
			throw new HttpException('Bad Request', 400);
		}

		return updatedClub;
	}

	async delete(clubId: string | Types.ObjectId) {
		const deletedClub = await this.clubModel.findByIdAndRemove(clubId).exec();
		if (!deletedClub) {
			throw new HttpException('Bad Request', 400);
		}

		return deletedClub;
	}

	async getAllSchedules(clubId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}

		return club.schedules;
	}

	async addSchedule(cludId: string | Types.ObjectId, scheduleId: Types.ObjectId) {
		const club = await this.clubModel.findById(cludId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.schedules.push(scheduleId);

		return club.save();
	}

	async getAllAudits(clubId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}

		return club.audits;
	}

	async addAudit(
		cludId: string | Types.ObjectId,
		auditId: Types.ObjectId,
		amount: number,
		isExpense: boolean,
	) {
		const club = await this.clubModel.findById(cludId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.audits.push(auditId);
		club.balance += isExpense ? -amount : amount;

		return club.save();
	}

	async addReview(cludId: string | Types.ObjectId, reviewId: Types.ObjectId) {
		const club = await this.clubModel.findById(cludId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.reviews.push(reviewId);

		return club.save();
	}

	async getAllReviews(clubId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}

		return club.reviews;
	}

	async deleteReview(clubId: string | Types.ObjectId, reviewId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.reviews = club.reviews.filter(review => review.toString() !== reviewId.toString());

		return club.save();
	}

	async addMember(clubId: string | Types.ObjectId, memberId: Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.members.push(memberId);

		return club.save();
	}

	async deleteMember(clubId: string | Types.ObjectId, memberId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.members = club.members.filter(member => member.toString() !== memberId.toString());

		return club.save();
	}

	async addRule(clubId: string | Types.ObjectId, ruleId: Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.rules.push(ruleId);

		return club.save();
	}

	async getAllRules(clubId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}

		return club.rules;
	}

	async deleteRule(clubId: string | Types.ObjectId, ruleId: string | Types.ObjectId) {
		const club = await this.clubModel.findById(clubId).exec();
		if (!club) {
			throw new HttpException('Bad Request', 400);
		}
		club.rules = club.rules.filter(rule => rule.toString() !== ruleId.toString());

		return club.save();
	}
}
