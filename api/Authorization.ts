import { b64EncodeUnicode } from '../support/helpers';
import { ResponseBody } from '../support/types';
import BaseRequest from './BaseRequest';
import { SIGNUP, LOGIN } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';

export default class Authorization extends BaseRequest {
  async signupUser(username: string, password: string): Promise<ResponseBody> {
    const config = this.config({
      username,
      password: b64EncodeUnicode(password),
    });
    return this.makeRequest(POST, SIGNUP, config);
  }

  async loginUser(username: string, password: string): Promise<ResponseBody> {
    const config = this.config({
      username,
      password: b64EncodeUnicode(password),
    });
    return this.makeRequest(POST, LOGIN, config);
  }
}
