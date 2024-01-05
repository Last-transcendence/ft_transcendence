import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FtSeoulAuthGuard extends AuthGuard('ft') {
  // async canActivate(context: any): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const result = (await super.canActivate(context)) as boolean;
  //   return result;
  // }
}
