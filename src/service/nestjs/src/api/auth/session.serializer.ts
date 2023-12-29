import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UserService from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userSerivice: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.intraId);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {

    const user = await this.userSerivice.getUserByintraId(payload);
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { ...userInfo } = user;
    done(null, userInfo);
  }
}
