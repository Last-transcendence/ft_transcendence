import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

interface MailerOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

@Injectable()
class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'naver',
            auth: {
                user: process.env.EMAILADDRESS,
                pass: process.env.EMAILPASSWORD,
            },
        });
    }

    async send(to: string, nickname: string, code: string) {
        const emailOptions: MailerOptions = {
            from: process.env.EMAILADDRESS,
            to,
            subject: '가입 인증 메일',
            html: `<h1> 인증 코드를 입력하면 가입 인증이 완료됩니다.</h1><br/>${code}`,
        };

        await this.transporter.sendMail(emailOptions);
    }
}

export default MailService;