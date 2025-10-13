import { asyncForEach } from '../support/Helpers';
import BasePage from './BasePage';

export default class SuccessModal extends BasePage {
  private readonly successModal: string = '.sweet-alert h2';
  private readonly okButton: string = '.confirm';
  private readonly infoText: string = '.lead';

  async closeModal(): Promise<void> {
    await this.clickElement(this.okButton);
  }

  async verifySuccessModal(...data: string[]): Promise<void> {
    await this.verifyElementIsVisible(this.successModal);
    await this.verifyElementText(
      this.successModal,
      'Thank you for your purchase!',
    );
    await asyncForEach(data, async (text) => {
      await this.verifyElementContainsText(this.infoText, text);
    });
  }
}
