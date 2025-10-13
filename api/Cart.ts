import { VIEW_CART, DELETE_ITEM } from '../support/constants/Endpoints';
import { ResponseBody } from '../support/types';
import BaseRequest from './BaseRequest';

export default class CartPage extends BaseRequest {
  async getItemsInCart(flag: boolean): Promise<ResponseBody> {
    const config = this.config({ flag });
    return this.makeRequest('post', VIEW_CART, config);
  }

  async deleteItemFromCart(id: string): Promise<ResponseBody> {
    const config = this.config({ id });
    return this.makeRequest('post', DELETE_ITEM, config);
  }
}
