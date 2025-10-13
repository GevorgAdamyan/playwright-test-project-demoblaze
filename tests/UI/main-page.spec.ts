import dotenv from 'dotenv';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import MainPage from '../../pages/MainPage';
import ProductPage from '../../pages/ProductPage';
import Products from '../../api/Products';
import test from '@playwright/test';
import { CHECK } from '../../support/constants/endpoint';
import { POST } from '../../support/constants/methods';
import { MONITOR, NOTEBOOK, PHONE } from '../../support/constants/variables';
dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let username: string = process.env.USERNAME as string;
let mainPage: MainPage;
let productPage: ProductPage;
let response: any;

const categories = [PHONE, NOTEBOOK, MONITOR];

const products = new Products();
let product: any;

test.describe('Main Page', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    mainPage = new MainPage(page);
    productPage = new ProductPage(page);
    const productsRes = await products.getEntries();
    product = productsRes.body.Items[0];
  });

  test.beforeEach(async () => {
    await mainPage.navigateTo('/');
    await mainPage.waitForResponse(POST, CHECK);
    await mainPage.verifyLoggedInUser(username);
  });

  test('verify main page view', async () => {
    await mainPage.verifyTabs();
    await mainPage.verifyCategories();
    await mainPage.verifyItems();
  });

  for (const category of categories) {
    test(`should filter items by category; ${category}`, async () => {
      response = await mainPage.filterByCategory(category);
      mainPage.verifyItemsFilteredByCategory(response.Items, category);
    });
  }

  test('should open item page', async () => {
    await mainPage.openItemPage(product.title);
    await productPage.verifyPageUrl(product.id.toString());
    await productPage.verifyProductDetails(
      product.title,
      product.price.toString(),
      product.desc,
    );
  });
});
