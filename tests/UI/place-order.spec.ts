import dotenv from 'dotenv';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import MainPage from '../../pages/MainPage';
import CartPage from '../../pages/CartPage';
import Products from '../../api/Products';
import OrderModal from '../../pages/OrderModal';
import SuccessModal from '../../pages/SuccessModal';
import Cart from '../../api/Cart';
import test from '@playwright/test';
import { asyncForEach, getCurrentDateWithSlash } from '../../support/helpers';
import { CHECK, DELETE_CART } from '../../support/constants/endpoint';
import { POST } from '../../support/constants/methods';
import {
  NAME,
  COUNTRY,
  CITY,
  CARD,
  MONTH,
  YEAR,
} from '../../support/constants/variables';
import { PLEASE_FILL_OUT_NAME_AND_CREDIT_CARD_MESSAGE } from '../../support/constants/errors_and_messages';
import {
  CUSTOMER_NAME,
  CUSTOMER_CARD,
  CUSTOMER_YEAR,
  CUSTOMER_MONTH,
  CUSTOMER_CITY,
  CUSTOMER_COUNTRY,
} from '../../support/constants/test_data';
dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let username: string = process.env.USERNAME as string;
let mainPage: MainPage;
let cartPage: CartPage;
let orderModal: OrderModal;
let successModal: SuccessModal;
let response: any;
let itemsInCart: any;
let totalPrice: number = 0;

const products = new Products();
const cart = new Cart();
let product: any;

test.describe('Place Order', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    mainPage = new MainPage(page);
    cartPage = new CartPage(page);
    orderModal = new OrderModal(page);
    successModal = new SuccessModal(page);
    const productsRes = await products.getEntries();
    product = productsRes.body.Items[0];
    await products.addProductToCart(product.id.toString(), true);
    totalPrice = product.price;
  });

  test.beforeEach(async () => {
    await mainPage.navigateTo('/');
    await mainPage.waitForResponse(POST, CHECK);
    await mainPage.verifyLoggedInUser(username);
    response = await mainPage.openCartPage();
    itemsInCart = response.Items;
    await cartPage.placeOrder();
  });

  test.afterAll(async () => {
    await asyncForEach(itemsInCart, async (item: any) => {
      await cart.deleteItemFromCart(item.id);
    });
    await browser.close();
  });

  test('should not place order with empty fields', async () => {
    await orderModal.purchase();
    orderModal.handleAlert(PLEASE_FILL_OUT_NAME_AND_CREDIT_CARD_MESSAGE);
  });


  test('should place order with valid fields (failing due to a bug in the application)', async () => {
    await orderModal.insertTextInModal(NAME, CUSTOMER_NAME);
    await orderModal.insertTextInModal(COUNTRY, CUSTOMER_COUNTRY);
    await orderModal.insertTextInModal(CITY, CUSTOMER_CITY);
    await orderModal.insertTextInModal(CARD, CUSTOMER_CARD);
    await orderModal.insertTextInModal(MONTH, CUSTOMER_MONTH);
    await orderModal.insertTextInModal(YEAR, CUSTOMER_YEAR);
    await orderModal.purchase();
    await orderModal.waitForResponse(POST, DELETE_CART);
    await successModal.verifySuccessModal(
      CUSTOMER_NAME,
      CUSTOMER_CARD,
      totalPrice.toString(),
      getCurrentDateWithSlash(),
    );
    await successModal.closeModal();
  });
});
