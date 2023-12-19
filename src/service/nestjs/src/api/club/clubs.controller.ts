import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	HttpException,
	HttpStatus,
	NotFoundException,
	UseGuards,
	Res,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBadRequestResponse,
	ApiBody,
	ApiParam,
	ApiNotFoundResponse,
	PartialType,
} from '@nestjs/swagger';
import { Club } from 'common/database/schema/club.schema';
import { ClubsService } from './service/club.service';
import { CreateClubDTO } from './dto/request/createClub.dto';
import { JwtAuthGuard } from 'common/auth/guard';
import { Types } from 'mongoose';
import { ScheduleService, AuditService } from './service';
import { Response } from 'express';
import { ReviewsService } from './service/reviews.service';
import { CreateReviewDTO } from './dto/request/createReview.dto';
import * as ClubDto from './dto/index';
import { CreateMemberDTO } from './dto/request/createMember.dto';
import { MemberService } from './service/member.service';
import { CreateRuleDTO } from './dto/request/createRule.dto';
import { RuleService } from './service/rule.service';

@Controller('club')
export class ClubsController {
	constructor(
		private readonly clubService: ClubsService,
		private readonly scheduleService: ScheduleService,
		private readonly auditService: AuditService,
		private readonly reviewService: ReviewsService,
		private readonly memberService: MemberService,
		private readonly ruleService: RuleService,
	) {}

	@ApiTags('club API')
	@Get()
	@ApiOperation({ summary: 'request all club', description: '모든 동아리 정보 가져오기' })
	@ApiResponse({ status: 200, description: 'get all club successfully', type: [Club] })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async findAll(): Promise<Club[]> {
		try {
			const clubs = await this.clubService.findAll();

			if (!clubs) {
				throw new NotFoundException('Clubs not found');
			}

			return clubs;
		} catch (error) {
			throw new HttpException('Failed to retrieve clubs', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiTags('club API')
	@Get('search')
	@ApiOperation({ summary: 'search club', description: '이름으로 동아리 검색' })
	@ApiResponse({ status: 200, description: 'Search club successfully', type: [Club] })
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiNotFoundResponse({ description: 'not found' })
	async search(@Query('name') searchingName: string) {
		try {
			const clubs = await this.clubService.searchByName(searchingName);

			if (!clubs || clubs.length === 0) {
				throw new NotFoundException('Clubs not found');
			}
			return clubs;
		} catch (error) {
			throw new HttpException('Failed to search clubs', HttpStatus.BAD_REQUEST);
		}
	}

	@ApiTags('club API')
	@Get(':id')
	@ApiOperation({
		summary: 'Get a club by id',
		description: '요청 id에 해당하는 club data 가져오기',
	})
	@ApiResponse({ status: 200, description: 'get one club data successfully', type: Club })
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiNotFoundResponse({ description: 'Not found' })
	async findClubById(@Param('id') clubId: string) {
		try {
			console.log(clubId);
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new NotFoundException('Club not found');
			}

			return club;
		} catch (error) {
			throw new HttpException('Failed to find a club', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiTags('club API')
	@Post()
	@ApiOperation({ summary: 'create a club', description: '동아리 생성' })
	@ApiBody({ type: CreateClubDTO })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	createClub(@Body() createClubDTO: CreateClubDTO) {
		try {
			const club = this.clubService.create(createClubDTO);

			if (!club) {
				throw new HttpException('Bad request', 400);
			}

			return club;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('club API')
	@Delete(':id')
	@ApiOperation({ summary: 'Delete a club', description: '동아리 삭제' })
	@ApiResponse({ status: 200, description: '동아리 삭제에 성공하였습니다' })
	@ApiParam({
		description: 'Club ID',
		name: 'id',
	})
	remove(@Param('id') clubId: string) {
		try {
			const deletedClub = this.clubService.delete(clubId);
			if (!deletedClub) {
				throw new NotFoundException('Club not found');
			}
			return deletedClub;
		} catch (error) {
			throw new HttpException('Failed to delete a club', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiTags('club API')
	@Patch(':id')
	@ApiOperation({ summary: 'Update a club', description: '동아리 정보 수정' })
	@ApiResponse({ status: 200, description: '동아리 수정에 성공하였습니다' })
	@ApiParam({
		description: 'Club ID',
		name: 'id',
	})
	@ApiBody({
		type: PartialType<Club>,
		description: '수정할 동아리 정보',
	})
	async patch(@Param('id') clubId: string, @Body() updateData: Partial<Club>) {
		try {
			const updatedClub = await this.clubService.update(clubId, updateData);
			if (!updatedClub) {
				throw new NotFoundException('Club not found');
			}
			return updatedClub;
		} catch (error) {
			throw new HttpException('Failed to update club', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiTags('Schedule API')
	@Get('/:cid/schedule')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all schedule for the requested month' })
	@ApiResponse({
		status: 200,
		description: 'Get all schedule for the requested month successfully',
	})
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getAllSchedulesForTheMonth(
		@Param('cid') clubId: string,
		@Query('month') month: number,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const scheduleIds = await this.clubService.getAllSchedules(clubId);
			const schedulesForMonth = await this.scheduleService.getAllSchedulesForTheMonth(
				scheduleIds,
				month,
			);
			if (!schedulesForMonth) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({
				message: 'Get all schedule for the requested month successfully',
				schedulesForMonth,
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Schedule API')
	@Get('/:cid/schedule/:sid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get a schedule' })
	@ApiResponse({ status: 200, description: 'Get a schedule successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getScheduleById(
		@Param('cid') clubId: string,
		@Param('sid') scheduleId: string,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const scheduleIds = await this.clubService.getAllSchedules(clubId);
			if (!scheduleIds.includes(scheduleId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const schedule = await this.scheduleService.getScheduleById(scheduleId);
			if (!schedule) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Get a schedule successfully', schedule });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Schedule API')
	@Post('/:cid/schedule')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'create a schedule' })
	@ApiResponse({ status: 201, description: 'Schedule created successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createSchdule(
		@Param('cid') clubId: string,
		@Body() createScheduleDto: ClubDto.Request.CreateScheduleDto,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const schedule = await this.scheduleService.createSchedule(createScheduleDto);
			if (!schedule) {
				throw new HttpException('Bad request', 400);
			}

			const scheduleId: Types.ObjectId = schedule['_id'];
			const updatedClub = await this.clubService.addSchedule(clubId, scheduleId);
			if (!updatedClub) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Schedule created successfully' });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Schedule API')
	@Patch('/:cid/schedule/:sid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update a schedule' })
	@ApiResponse({ status: 200, description: 'Update a schedule successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async updateSchedule(
		@Param('cid') clubId: string,
		@Param('sid') scheduleId: string,
		@Body() updateData: Partial<ClubDto.Request.CreateScheduleDto>,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const scheduleIds = await this.clubService.getAllSchedules(clubId);
			if (!scheduleIds.includes(scheduleId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const updatedSchedule = await this.scheduleService.updateSchedule(scheduleId, updateData);
			if (!updatedSchedule) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Update a schedule successfully', updatedSchedule });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Schedule API')
	@Delete('/:cid/schedule/:sid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a schedule' })
	@ApiResponse({ status: 200, description: 'Delete a schedule successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async deleteSchedule(
		@Param('cid') clubId: string,
		@Param('sid') scheduleId: string,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const scheduleIds = await this.clubService.getAllSchedules(clubId);
			if (!scheduleIds.includes(scheduleId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const deletedSchedule = await this.scheduleService.deleteSchedule(scheduleId);
			if (!deletedSchedule) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Delete a schedule successfully', deletedSchedule });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Audit API')
	@Get('/:cid/audit')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all audit' })
	@ApiResponse({ status: 200, description: 'Get all audit successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getAllAudit(@Param('cid') clubId: string) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const auditIds = await this.clubService.getAllAudits(clubId);
			if (!auditIds) {
				throw new HttpException('Bad request', 400);
			}

			const audits = await this.auditService.getAllAudits(auditIds);
			if (!audits) {
				throw new HttpException('Bad request', 400);
			}

			return audits;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Audit API')
	@Post('/:cid/audit')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create an audit' })
	@ApiResponse({ status: 201, description: 'Audit created successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createAudit(
		@Param('cid') clubId: string,
		@Body() createAuditDto: ClubDto.Request.CreateAuditDto,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const audit = await this.auditService.createAudit(createAuditDto);
			if (!audit) {
				throw new HttpException('Bad request', 400);
			}

			const auditId: Types.ObjectId = audit['_id'];
			const amount = audit.amount;
			const isExpense = audit.isExpense;
			const updatedClub = await this.clubService.addAudit(clubId, auditId, amount, isExpense);
			if (!updatedClub) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({
				club: updatedClub,
				audit,
			});
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Audit API')
	@Get('/:cid/audit/:aid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get an audit' })
	@ApiResponse({ status: 200, description: 'Get an audit successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getAuditById(
		@Param('cid') clubId: string,
		@Param('aid') auditId: string,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const auditIds = await this.clubService.getAllAudits(clubId);
			if (!auditIds.includes(auditId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const audit = await this.auditService.getAuditById(auditId);
			if (!audit) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Get an audit successfully', audit });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Audit API')
	@Patch('/:cid/audit/:aid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update an audit' })
	@ApiResponse({ status: 200, description: 'Update an audit successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async updateAudit(
		@Param('cid') clubId: string,
		@Param('aid') auditId: string,
		@Body() updateData: Partial<ClubDto.Request.CreateAuditDto>,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const auditIds = await this.clubService.getAllAudits(clubId);
			if (!auditIds.includes(auditId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const updatedAudit = await this.auditService.updateAudit(auditId, updateData);
			if (!updatedAudit) {
				throw new HttpException('Bad request', 400);
			}

			return updatedAudit;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Audit API')
	@Delete('/:cid/audit/:aid')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete an audit' })
	@ApiResponse({ status: 200, description: 'Delete an audit successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async deleteAudit(
		@Param('cid') clubId: string,
		@Param('aid') auditId: string,
		@Res({ passthrough: true }) response: Response,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (!club) {
				throw new HttpException('Club is not found', 404);
			}

			const auditIds = await this.clubService.getAllAudits(clubId);
			if (!auditIds.includes(auditId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			const deletedAudit = await this.auditService.deleteAudit(auditId);
			if (!deletedAudit) {
				throw new HttpException('Bad request', 400);
			}

			return response.json({ message: 'Delete an audit successfully', deletedAudit });
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	// user가 따로 배열에 굳이 저장 해야 하는지 의문이라서 일단 뺌
	@ApiTags('Review API')
	@Post('/:cid/review')
	@ApiOperation({ summary: 'create a review', description: 'review 생성' })
	@ApiBody({ type: CreateReviewDTO })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	async createReview(
		@Body() createReviewDTO: CreateReviewDTO,
		// 그냥 Body로 id를 받아오면 안되나?
		@Param('cid') clubId: string,
	) {
		try {
			const review = await this.reviewService.create(createReviewDTO);
			if (!review) {
				throw new HttpException('Bad request', 400);
			}

			const reviewId: Types.ObjectId = review['_id'];
			const club = await this.clubService.addReview(clubId, reviewId);
			if (!club) {
				throw new HttpException('Bad request', 400);
			}

			return review;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Review API')
	@Get('/:cid/review/')
	@ApiOperation({ summary: 'get all review of club', description: 'review 가져오기' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	async getAllReviews(@Param('cid') clubId: string) {
		try {
			const reviewIds = await this.clubService.getAllReviews(clubId);

			const reviewPromises = reviewIds.map(rid => this.reviewService.getReviewById(rid));

			const reviews = await Promise.all(reviewPromises);

			return reviews;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Review API')
	@Patch('/review/:rid')
	@ApiOperation({ summary: 'update a review', description: 'review 수정' })
	@ApiBody({ type: CreateReviewDTO })
	@ApiParam({ name: 'rid', description: 'Review ID' })
	@ApiResponse({ status: 200, description: '수정 성공' })
	async updateReview(@Param('rid') reviewId: string, @Body() updateData: Partial<CreateReviewDTO>) {
		try {
			const updatedReview = await this.reviewService.updateReview(reviewId, updateData);

			if (!updatedReview) {
				throw new HttpException('Bad request', 400);
			}

			return updatedReview;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Review API')
	@Delete('/:cid/review/:rid')
	@ApiOperation({ summary: 'delete a review', description: 'review 삭제' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiParam({ name: 'rid', description: 'Review ID' })
	@ApiResponse({ status: 200, description: '삭제 성공' })
	async deleteReview(@Param('cid') clubId: string, @Param('rid') reviewId: string) {
		try {
			const reviewIds = await this.clubService.getAllReviews(clubId);

			if (!reviewIds.includes(reviewId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			await this.clubService.deleteReview(clubId, reviewId);
			const deletedReview = await this.reviewService.deleteReview(reviewId);

			if (!deletedReview) {
				throw new HttpException('Bad request', 400);
			}

			return deletedReview;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Member API')
	@Post('/:cid/member')
	@ApiOperation({ summary: 'add a member', description: 'member 추가' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 200, description: '추가 성공' })
	async createMember(
		@Body() createMemberDTO: CreateMemberDTO,
		// 그냥 Body로 id를 받아오면 안되나?
		@Param('cid') clubId: string,
	) {
		try {
			const member = await this.memberService.create(createMemberDTO);
			let club = await this.clubService.findClubById(clubId);

			if (!member) {
				throw new NotFoundException('member not found');
			}

			const memberId: Types.ObjectId = member['_id'];
			club = await this.clubService.addMember(clubId, memberId);

			if (!club) {
				throw new HttpException('Bad request', 400);
			}

			return member;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Member API')
	@Get('/:cid/member/')
	@ApiOperation({ summary: 'get all member of club', description: 'member 가져오기' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 200, description: '가져오기 성공' })
	async getAllMembers(@Param('cid') clubId: string) {
		try {
			const club = await this.clubService.findClubById(clubId);
			const memberIds = club.members;
			const members = await Promise.all(await this.memberService.findAll(memberIds));

			return members;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Member API')
	@Get('/:cid/member/:mid')
	@ApiOperation({ summary: 'Get a member of the club', description: 'Member 가져오기' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiParam({ name: 'mid', description: 'Member ID' })
	@ApiResponse({ status: 200, description: '가져오기 성공' })
	async getMember(@Param('cid') clubId: string, @Param('mid') memberId: string) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (club.members.indexOf(memberId as unknown as Types.ObjectId) === -1) {
				throw new HttpException('Bad request', 400);
			}

			return await this.memberService.getMemberById(memberId);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Member API')
	@Patch('/:cid/member/:mid')
	@ApiOperation({ summary: 'Update a member of the club', description: 'Member 수정' })
	@ApiBody({ type: CreateMemberDTO })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiParam({ name: 'mid', description: 'Member ID' })
	@ApiResponse({ status: 200, description: '수정 성공' })
	async updateMember(
		@Param('cid') clubId: string,
		@Param('mid') memberId: string,
		@Body() updateData: Partial<CreateMemberDTO>,
	) {
		try {
			const club = await this.clubService.findClubById(clubId);
			if (club.members.indexOf(memberId as unknown as Types.ObjectId) === -1) {
				throw new HttpException('Bad request', 400);
			}

			const mid: Types.ObjectId = memberId as unknown as Types.ObjectId;

			return await this.memberService.updateMember(mid, updateData);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Member API')
	@Delete('/:cid/member/:mid')
	@ApiOperation({ summary: 'delete a member', description: 'member 삭제' })
	@ApiParam({ name: 'mid', description: 'Member ID' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 200, description: '삭제 성공' })
	async deleteMember(@Param('mid') memberId: string, @Param('cid') clubId: string) {
		try {
			const deletedMember = await this.memberService.deleteMember(memberId);
			await this.clubService.deleteMember(clubId, memberId);

			if (!deletedMember) {
				throw new HttpException('Bad request', 400);
			}

			return deletedMember;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Rule API')
	@Post('/:cid/rule')
	@ApiOperation({ summary: 'create a rule', description: 'rule 생성' })
	@ApiBody({ type: CreateRuleDTO })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	async createRule(@Body() createRuleDTO: CreateRuleDTO, @Param('cid') clubId: string) {
		try {
			const rule = await this.ruleService.create(createRuleDTO);

			if (!rule) {
				throw new NotFoundException('Rule not found');
			}

			const ruleId: Types.ObjectId = rule['_id'];
			const club = await this.clubService.addRule(clubId, ruleId);

			if (!club) {
				throw new HttpException('Bad request', 400);
			}

			return rule;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Rule API')
	@Get('/rule/:rid')
	@ApiOperation({ summary: 'get a rule by id', description: 'rule 한개 가져오기' })
	@ApiParam({ name: 'rid', description: 'Rule ID' })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	async getRuleById(@Param('rid') ruleId: string) {
		try {
			return await this.ruleService.getRuleById(ruleId);
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Rule API')
	@Get('/:cid/rule/')
	@ApiOperation({ summary: 'get all rule of club', description: 'club의 모든 rule 가져오기' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiResponse({ status: 201, description: '업로드에 성공하였습니다' })
	@ApiResponse({ status: 404, description: '업로드에 실패하였습니다' })
	async getAllRules(@Param('cid') clubId: string) {
		try {
			const ruleIds = await this.clubService.getAllRules(clubId);

			const rulePromises = ruleIds.map(rid => this.ruleService.getRuleById(rid));

			const rules = await Promise.all(rulePromises);

			return rules;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Rule API')
	@Patch('/rule/:rid')
	@ApiOperation({ summary: 'update a rule', description: 'rule 수정' })
	@ApiBody({ type: CreateRuleDTO })
	@ApiParam({ name: 'rid', description: 'Rule ID' })
	@ApiResponse({ status: 200, description: '수정 성공' })
	async updateRule(@Param('rid') ruleId: string, @Body() updateData: Partial<CreateRuleDTO>) {
		try {
			const updatedRule = await this.ruleService.updateRule(ruleId, updateData);

			if (!updatedRule) {
				throw new HttpException('Bad request', 400);
			}

			return updatedRule;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@ApiTags('Rule API')
	@Delete('/:cid/rule/:rid')
	@ApiOperation({ summary: 'delete a rule', description: 'rule 삭제' })
	@ApiParam({ name: 'cid', description: 'Club ID' })
	@ApiParam({ name: 'rid', description: 'Rule ID' })
	@ApiResponse({ status: 200, description: '삭제 성공' })
	async deleteRule(@Param('cid') clubId: string, @Param('rid') ruleId: string) {
		try {
			const ruleIds = await this.clubService.getAllRules(clubId);

			if (!ruleIds.includes(ruleId as unknown as Types.ObjectId)) {
				throw new HttpException('Bad request', 400);
			}

			await this.clubService.deleteRule(clubId, ruleId);
			const deletedRule = await this.ruleService.deleteRule(ruleId);

			if (!deletedRule) {
				throw new HttpException('Bad request', 400);
			}

			return deletedRule;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
