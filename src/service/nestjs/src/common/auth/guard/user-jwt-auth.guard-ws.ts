import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import UserService from 'api/user/user.service';
import { Socket } from 'socket.io';

@Injectable()
class UserJwtWs implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const socket: Socket = context.switchToWs().getClient();

		const accessToken = request.cookies['accessToke'];
		const payload = this.jwtService.verify(accessToken);

		request.user = await this.userService.findByIntraId(payload.sub);

		socket.data.user = request.user;

		return true;
	}
}

export default UserJwtWs;
