import { Locator, Page, expect } from '@playwright/test';

/**
 * Abstract base page class that provides common page interaction methods for Playwright tests
 */
export default abstract class BasePage {
  protected page: Page;

  /**
   * Creates a new instance of BasePage
   * @param page - The Playwright Page instance to interact with
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL and waits for the page to fully load
   * @param url - The URL to navigate to
   * @returns Promise that resolves when navigation is complete
   */
  async navigateTo(url: string): Promise<void> {
    console.log(`Navigating to URL: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

  /**
   * Waits for a specific HTTP response matching the provided method and path
   * @param method - The HTTP method to wait for (GET, POST, etc.)
   * @param path - The path or URL segment to match in the response
   * @param timeout - Maximum time to wait in milliseconds (default: 15000)
   * @returns Promise that resolves with the Response object when found
   */
  async waitForResponse(
    method: string,
    path: string,
    timeout = 15000,
  ): Promise<any> {
    console.log(`Waiting for ${method} ${path} request to complete`);
    const response = await this.page.waitForResponse(
      (resp) =>
        resp.url().includes(path) &&
        resp.request().method().toLowerCase() === method.toLowerCase(),
      { timeout },
    );
    return response;
  }

  /**
   * Gets a single element by selector and ensures it's visible and scrolled into view
   * @param selector - CSS selector or other locator string for the element
   * @param timeout - Maximum time to wait for element visibility in milliseconds (default: 10000)
   * @returns Promise that resolves with a Locator for the element
   * @protected
   */
  protected async getElement(
    selector: string,
    timeout = 10000,
  ): Promise<Locator> {
    const element: Locator = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await element.scrollIntoViewIfNeeded();
    return element;
  }

  /**
   * Gets all elements matching the provided selector
   * @param selector - CSS selector or other locator string for the elements
   * @returns Promise that resolves with an array of Locators for all matching elements
   * @protected
   */
  protected async getElements(selector: string): Promise<Locator[]> {
    return this.page.locator(selector).all();
  }

  /**
   * Clicks on an element identified by the provided selector
   * @param selector - CSS selector or other locator string for the element to click
   * @returns Promise that resolves when the click action is complete
   * @protected
   */
  protected async clickElement(selector: string): Promise<void> {
    console.log(`Clicking element with selector: ${selector}`);
    const element: Locator = await this.getElement(selector);
    await element.click();
  }

  /**
   * Types text into an input element identified by the provided selector
   * @param selector - CSS selector or other locator string for the input element
   * @param text - The text to type into the input field
   * @returns Promise that resolves when the text input is complete
   * @protected
   */
  protected async typeText(selector: string, text: string): Promise<void> {
    console.log(`Typing text: ${text} into element with selector: ${selector}`);
    const element: Locator = await this.getElement(selector);
    await element.fill(text);
  }

  /**
   * Gets the text content of an element
   * @param selector - CSS selector string or Locator object for the element
   * @returns Promise that resolves with the text content of the element (empty string if no text)
   * @protected
   */
  protected async getText(selector: string | Locator): Promise<string> {
    const element: Locator =
      typeof selector === 'string' ? await this.getElement(selector) : selector;
    return (await element.textContent()) ?? '';
  }

  /**
   * Verifies that the current page URL contains the specified path
   * @param path - The path string that should be present in the current URL
   * @returns Promise that resolves when the verification is complete
   * @throws AssertionError if the URL doesn't contain the expected path
   */
  async verifyPageUrl(path: string): Promise<void> {
    console.log(`Verifying page url contains: ${path}`);
    expect(this.page.url()).toContain(path);
  }

  /**
   * Sets up a handler for browser alerts/dialogs with expected text verification
   * @param expectedText - The expected text content of the alert dialog
   * @param accept - Whether to accept (true) or dismiss (false) the dialog (default: true)
   */
  handleAlert(expectedText: string, accept = true): void {
    this.page.on('dialog', async (dialog) => {
      console.log(`Handling alert with text: ${dialog.message()}`);
      expect(dialog.message()).toBe(expectedText);
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Verifies that an element identified by the selector is visible on the page
   * @param selector - CSS selector or other locator string for the element
   * @returns Promise that resolves when the visibility verification is complete
   * @throws AssertionError if the element is not visible
   * @protected
   */
  protected async verifyElementIsVisible(selector: string): Promise<void> {
    console.log(`Verifying element with selector: ${selector} is visible`);
    const element: Locator = await this.getElement(selector);
    await expect(element).toBeVisible();
  }

  /**
   * Verifies that an element has the exact expected text content
   * @param selector - CSS selector or other locator string for the element
   * @param expectedText - The exact text that the element should contain
   * @returns Promise that resolves when the text verification is complete
   * @throws AssertionError if the element text doesn't match exactly
   * @protected
   */
  protected async verifyElementText(
    selector: string,
    expectedText: string,
  ): Promise<void> {
    console.log(
      `Verifying element with selector: ${selector} has text: ${expectedText}`,
    );
    const element: Locator = await this.getElement(selector);
    await expect(element).toHaveText(expectedText);
  }

  /**
   * Verifies that an element contains the expected text (partial match)
   * @param selector - CSS selector or other locator string for the element
   * @param expectedText - The text that should be contained within the element
   * @returns Promise that resolves when the text verification is complete
   * @throws AssertionError if the element doesn't contain the expected text
   * @protected
   */
  protected async verifyElementContainsText(
    selector: string,
    expectedText: string,
  ): Promise<void> {
    console.log(
      `Verifying element with selector: ${selector} contains text: ${expectedText}`,
    );
    const element: Locator = await this.getElement(selector);
    await expect(element).toContainText(expectedText);
  }
}
