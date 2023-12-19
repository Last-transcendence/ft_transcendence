import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rule } from 'common/database/schema/rule.schema';
import { CreateRuleDTO } from '../dto/request/createRule.dto';

@Injectable()
export class RuleService {
	constructor(@InjectModel(Rule.name) private ruleModel: Model<Rule>) {}

	async create(createRuleDto: CreateRuleDTO): Promise<Rule> {
		try {
			return await this.ruleModel.create(createRuleDto);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async getRuleById(ruleId: Types.ObjectId | string): Promise<Rule> {
		try {
			return await this.ruleModel.findById(ruleId).exec();
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async deleteRule(ruleId: string | Types.ObjectId): Promise<Rule> {
		try {
			const deletedReview = await this.ruleModel.findByIdAndRemove({ _id: ruleId }).exec();
			return deletedReview;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async updateRule(
		ruleId: string | Types.ObjectId,
		updateData: Partial<CreateRuleDTO>,
	): Promise<Rule | null> {
		try {
			return await this.ruleModel.findByIdAndUpdate(ruleId, updateData, { new: true });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
