import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Audit } from 'common/database/schema';
import * as ClubDto from '../dto';

@Injectable()
export class AuditService {
	constructor(@InjectModel('Audit') private readonly auditModel: Model<Audit>) {}

	async getAllAudits(auditIds: string[] | Types.ObjectId[]) {
		try {
			// reverse order by string date
			const audits = await this.auditModel.find({ _id: { $in: auditIds } }).exec();

			return audits.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);

				return dateB.getTime() - dateA.getTime();
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async createAudit(createAuditDto: ClubDto.Request.CreateAuditDto) {
		try {
			return await this.auditModel.create(createAuditDto);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async getAuditById(auditId: string | Types.ObjectId) {
		try {
			return await this.auditModel.findById(auditId).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async updateAudit(
		auditId: string | Types.ObjectId,
		updateAuditDto: Partial<ClubDto.Request.CreateAuditDto>,
	) {
		try {
			return await this.auditModel.findByIdAndUpdate(auditId, updateAuditDto).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteAudit(auditId: string | Types.ObjectId) {
		try {
			return await this.auditModel.findByIdAndDelete(auditId).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
