import { SIGNUP, LOGIN } from '../support/constants/Endpoints';
import { b64EncodeUnicode } from '../support/Helpers';
import { ResponseBody } from '../support/types';
import BaseRequest from './BaseRequest';

export default class Authorization extends BaseRequest {
  async signupUser(username: string, password: string): Promise<ResponseBody> {
    const config = this.config({
      username,
      password: b64EncodeUnicode(password),
    });
    return this.makeRequest('post', SIGNUP, config);
  }

  async loginUser(username: string, password: string): Promise<ResponseBody> {
    const config = this.config({
      username,
      password: b64EncodeUnicode(password),
    });
    return this.makeRequest('post', LOGIN, config);
  }
}
