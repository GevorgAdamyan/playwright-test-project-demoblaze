import { VIEW_CART, DELETE_ITEM } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';
import { ResponseBody } from '../support/types';
import BaseRequest from './BaseRequest';

export default class Cart extends BaseRequest {
  async getItemsInCart(flag: boolean): Promise<ResponseBody> {
    const config = this.config({ flag });
    return this.makeRequest(POST, VIEW_CART, config);
  }

  async deleteItemFromCart(id: string): Promise<ResponseBody> {
    const config = this.config({ id });
    return this.makeRequest(POST, DELETE_ITEM, config);
  }
}
