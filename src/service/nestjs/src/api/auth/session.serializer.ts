import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UserService from '../user/user.service';
import { session } from 'passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userSerivice: UserService) {
    super();
  }
  
  serializeUser(sessionInfo: any, done: (err: Error, sessionInfo: any) => void): any {
    console.log('serializeUser', sessionInfo.intraId);
    done(null, sessionInfo);
  }
  // 첫번째 42액세스토큰처리 
  // 두번쨰 세션 공부후 완벽히 처리가 된다면
  // jwt 토큰처리
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userSerivice.getUserByIntraId(payload.intraId);
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { ...userInfo } = user;
    console.log('deserializeUser');
    done(null, userInfo);
  }
}
