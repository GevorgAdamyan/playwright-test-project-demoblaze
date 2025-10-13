import { expect } from '@playwright/test';
import Products from '../api/Products';
import { asyncForEach } from '../support/helpers';
import { ResponseBody } from '../support/types';
import BasePage from './BasePage';
import { VIEW_CART, VIEW, BY_CATEGORY } from '../support/constants/Endpoints';

const products = new Products();

export default class MainPage extends BasePage {
  private readonly homeLink: string = '#nava';
  private readonly contactLink: string = '#contcar';
  private readonly loginLink: string = '#login2';
  private readonly cartLink: string = '#cartur';
  private readonly userNameDisplay: string = '#nameofuser';
  private readonly logOut: string = '#logout2';
  private readonly category = (name: string): string =>
    `[onclick="byCat('${name.toLowerCase()}')"]`;
  private readonly item = (id: string): string =>
    `.card-title a[href*="${id}"]`;

  async openLoginModal(): Promise<void> {
    await this.clickElement(this.loginLink);
  }

  async openCartPage(): Promise<any> {
    await this.clickElement(this.cartLink);
    const itemsRes = await this.waitForResponse('post', VIEW_CART);
    await this.waitForResponse('post', VIEW);
    return itemsRes.json();
  }

  async openItemPage(name: string): Promise<void> {
    const response: ResponseBody = await products.getEntries();
    const items = response.body.Items;
    const item = items.find((item: any) => item.title === name);
    if (item) {
      await this.clickElement(this.item(item.id));
      const itemRes: any = await this.waitForResponse('post', VIEW);
      return itemRes.json();
    }
  }

  async filterByCategory(name: string): Promise<{ [key: string]: any }[]> {
    await this.clickElement(this.category(name));
    const response: any = await this.waitForResponse('post', BY_CATEGORY);
    return response.json();
  }

  async verifyLoggedInUser(username: string): Promise<void> {
    await this.verifyElementText(this.userNameDisplay, `Welcome ${username}`);
  }

  async verifyTabs(): Promise<void> {
    const tabs = [
      this.homeLink,
      this.contactLink,
      this.cartLink,
      this.userNameDisplay,
      this.logOut,
    ];
    await asyncForEach(tabs, async (tab) => {
      await this.verifyElementIsVisible(tab);
    });
  }

  async verifyCategories(): Promise<void> {
    const categories = ['Phone', 'Notebook', 'Monitor'];
    await asyncForEach(categories, async (category) => {
      await this.verifyElementIsVisible(this.category(category));
    });
  }

  async verifyItems(): Promise<void> {
    const response: ResponseBody = await products.getEntries();
    const items = response.body.Items;
    await asyncForEach(items, async (item: any) => {
      await this.verifyElementIsVisible(this.item(item.id));
      await this.verifyElementText(this.item(item.id), item.title);
    });
  }

  verifyItemsFilteredByCategory(
    items: { [key: string]: any }[],
    category: string,
  ): void {
    items.forEach((item) => {
      expect(item.cat.toLowerCase()).toBe(category.toLowerCase());
    });
  }
}
