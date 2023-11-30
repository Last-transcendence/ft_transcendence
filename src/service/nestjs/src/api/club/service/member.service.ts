import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'common/database/schema';
import { Model, Types } from 'mongoose';
import { CreateMemberDTO } from '../dto/request/createMember.dto';

@Injectable()
export class MemberService {
	constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

	async create(createMemberDTO: CreateMemberDTO): Promise<Member> {
		try {
			// 멤버 콜렉션에서 userId 속성이 특정 userId 값과 일치하는 멤버를 찾습니다.
			const userId = createMemberDTO.userId;
			const member = await this.memberModel.findOne({ userId: userId }).exec();

			if (member) {
				throw new HttpException('이미 존재하는 유저입니다.', HttpStatus.BAD_REQUEST);
			}

			return await this.memberModel.create(createMemberDTO);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async findAll(memberIds: Types.ObjectId[]): Promise<Member[]> {
		const members = [];
		memberIds.forEach(memberId => {
			members.push(this.memberModel.findById(memberId).exec());
		});
		return members;
	}

	async getMemberById(memberId: string | Types.ObjectId): Promise<Member> {
		try {
			const member = await this.memberModel.findById(memberId).exec();
			if (!member) {
				throw new HttpException('존재하지 않는 유저입니다.', HttpStatus.BAD_REQUEST);
			}

			return member;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	async updateMember(
		memberId: Types.ObjectId,
		updateData: Partial<CreateMemberDTO>,
	): Promise<Member | null> {
		const member = this.memberModel.findByIdAndUpdate(memberId, updateData, { new: true }).exec();
		if (!member) {
			throw new HttpException('존재하지 않는 유저입니다.', 401);
		}

		return member;
	}

	async deleteMember(memberId: string | Types.ObjectId): Promise<Member> {
		try {
			const deletedMember = await this.memberModel.findByIdAndRemove({ _id: memberId }).exec();
			if (!deletedMember) {
				throw new HttpException('존재하지 않는 유저입니다.', HttpStatus.BAD_REQUEST);
			}
			return deletedMember;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
