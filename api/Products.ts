import {
  ENTRIES,
  VIEW,
  ADD_TO_CART,
  BY_CATEGORY,
} from '../support/constants/endpoint';
import { GET, POST } from '../support/constants/methods';
import { generateId } from '../support/helpers';
import { ResponseBody } from '../support/types';
import BaseRequest from './BaseRequest';

export default class Products extends BaseRequest {
  async getEntries(): Promise<ResponseBody> {
    const config = this.config();
    return this.makeRequest(GET, ENTRIES, config);
  }

  async getProductById(id: string): Promise<ResponseBody> {
    const config = this.config({ id });
    return this.makeRequest(POST, VIEW, config);
  }

  async addProductToCart(
    prod_id: string,
    flag: boolean,
  ): Promise<ResponseBody> {
    const id = generateId();
    const body = { id, prod_id, flag };
    const config = this.config(body);
    return this.makeRequest(POST, ADD_TO_CART, config);
  }

  async getProductsByCategory(cat: string): Promise<ResponseBody> {
    const config = this.config({ cat });
    return this.makeRequest(POST, BY_CATEGORY, config);
  }
}
