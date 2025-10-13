import { ADD_TO_CART } from '../support/constants/Endpoints';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
  private readonly productTitle: string = 'h2.name';
  private readonly productPrice: string = 'h3.price-container';
  private readonly productDescription: string = '#more-information p';
  private readonly addToCartButton: string = 'a[onclick*="addToCart"]';

  async addToCart(): Promise<void> {
    await this.clickElement(this.addToCartButton);
    await this.waitForResponse('post', ADD_TO_CART);
  }

  async verifyProductDetails(
    name: string,
    price: string,
    description: string,
  ): Promise<void> {
    await this.verifyElementText(this.productTitle, name);
    await this.verifyElementContainsText(this.productPrice, price);
    await this.verifyElementText(this.productDescription, description);
  }
}
