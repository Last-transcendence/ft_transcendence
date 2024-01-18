import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from 'api/auth/service/mail.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class TwoFactorService {
    constructor(private readonly mailService: MailService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async send2faEmail(user: User, code: string) {
        if (!user.email2fa) {
            throw new BadRequestException('Email 정보가 없습니다.');
        }
        await this.cacheManager.set(user.email2fa, code);
        await this.mailService.send(user.email2fa, user.nickname, code);
    }

    async createCode() {
        return Math.floor(10000 + Math.random() * 900000).toString();
    }

    async confirmVerificationCode( user: User, verificationCode: string) {
        try {
            const cachedCode = await this.cacheManager.get(user.email2fa);
            if (!cachedCode) {
                throw new NotFoundException('인증번호가 없습니다.');
            }

            if (cachedCode !== verificationCode) {
                throw new BadRequestException('인증번호가 일치하지 않습니다.');
            }

            return { message: '인증 코드가 일치합니다.' };
        } catch (error) {
            throw new BadRequestException('인증 코드 확인 중 오류가 발생했습니다.');
        }
    }
}