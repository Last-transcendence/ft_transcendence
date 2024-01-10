import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type Everything = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
class FtJwt extends AuthGuard('ft-jwt') {
	handleRequest<TUser>(
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

export default FtJwt;
