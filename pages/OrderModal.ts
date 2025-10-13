import {
  CITY,
  COUNTRY,
  CARD,
  MONTH,
  NAME,
  YEAR,
} from '../support/constants/variables';
import { asyncForEach } from '../support/helpers';
import BasePage from './BasePage';

export default class OrderModal extends BasePage {
  private readonly orderModal: string = '#orderModal';
  private readonly modalInput = (field: string) => `#${field.toLowerCase()}`;
  private readonly purchaseButton: string = '[onclick="purchaseOrder()"]';

  async insertTextInModal(field: string, text: string): Promise<void> {
    await this.typeText(this.modalInput(field), text);
  }

  async purchase(): Promise<void> {
    await this.clickElement(this.purchaseButton);
  }

  async verifyPlaceOrderModal(): Promise<void> {
    const selectors: string[] = [
      this.orderModal,
      this.modalInput(NAME),
      this.modalInput(COUNTRY),
      this.modalInput(CITY),
      this.modalInput(CARD),
      this.modalInput(MONTH),
      this.modalInput(YEAR),
      this.purchaseButton,
    ];
    await asyncForEach(selectors, async selector => {
      await this.verifyElementIsVisible(selector);
    });
  }
}
