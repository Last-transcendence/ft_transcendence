import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type Everything =
	| string
	| number
	| boolean
	| null
	| undefined
	| Record<string, unknown>
	| Everything[];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
	handleRequest<TUser = any>(
		err: Everything,
		user: Everything,
		info: Everything,
		context: ExecutionContext,
		status?: Everything,
	): TUser {
		try {
			return super.handleRequest(err, user, info, context, status);
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}
}
