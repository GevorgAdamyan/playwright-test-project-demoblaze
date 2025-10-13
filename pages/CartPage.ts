import { expect } from '@playwright/test';
import BasePage from './BasePage';
import { DELETE_ITEM } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';

export default class CartPage extends BasePage {
  private readonly itemsRow: string = 'tr.success';
  private readonly itemTitle: string = 'td:nth-child(2)';
  private readonly itemPrice: string = 'td:nth-child(3)';
  private readonly totalPrice: string = '#totalp';
  private readonly placeOrderButton: string =
    'button[data-target="#orderModal"]';
  private readonly deleteLink: string = 'a[onclick*="deleteItem"]';

  private itemName: string | undefined = undefined;

  focusOnItem(name: string): void {
    this.itemName = name;
  }

  private async getItemNames(): Promise<string[]> {
    const itemNames: string[] = [];
    const items = await this.page.$$(this.itemsRow);
    for (const item of items) {
      const title = await item.$eval(this.itemTitle, el => el.textContent);
      if (title) {
        itemNames.push(title);
      }
    }
    return itemNames;
  }

  private async getItemRowIndex(): Promise<number> {
    if (!this.itemName) {
      return 0;
    }
    const itemNames = await this.getItemNames();
    return itemNames.indexOf(this.itemName);
  }

  async getItemPrice(): Promise<string | null> {
    const rowIndex = await this.getItemRowIndex();
    const priceBoxes = await this.getElements(this.itemPrice);
    const priceBox = priceBoxes[rowIndex];
    return this.getText(priceBox);
  }

  async placeOrder(): Promise<void> {
    await this.page.click(this.placeOrderButton);
  }

  async deleteItem(): Promise<void> {
    const rowIndex = await this.getItemRowIndex();
    const deleteLinks = await this.getElements(this.deleteLink);
    const deleteLink = deleteLinks[rowIndex];
    await deleteLink.click();
    await this.waitForResponse(POST, DELETE_ITEM);
    await this.page.waitForTimeout(5000);
  }

  async verifyCartPage(
    expectedCount: number,
    totalPrice: string,
  ): Promise<void> {
    await this.verifyPageUrl('cart');
    const items = await this.getElements(this.itemsRow);
    expect(items.length).toBe(expectedCount);
    await this.verifyElementIsVisible(this.placeOrderButton);
    await this.verifyElementIsVisible(this.totalPrice);
    await this.verifyElementContainsText(this.totalPrice, totalPrice);
  }
}
