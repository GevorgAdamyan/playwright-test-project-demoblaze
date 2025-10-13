import dotenv from 'dotenv';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import MainPage from '../../pages/MainPage';
import CartPage from '../../pages/CartPage';
import Products from '../../api/Products';
import OrderModal from '../../pages/OrderModal';
import Cart from '../../api/Cart';
import test from '@playwright/test';
import { asyncForEach } from '../../support/Helpers';
dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let username: string = process.env.USERNAME as string;
let mainPage: MainPage;
let cartPage: CartPage;
let orderModal: OrderModal;
let response: any;
let itemsInCart: any;
let totalPrice: number = 0;

const products = new Products();
const cart = new Cart();
let product: any;

test.describe('Cart page', () => {
  test.describe.configure({ mode: 'default' });
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    mainPage = new MainPage(page);
    cartPage = new CartPage(page);
    orderModal = new OrderModal(page);
    const productsRes = await products.getEntries();
    for (let i = 0; i < 5; i += 2) {
      product = productsRes.body.Items[i];
      await products.addProductToCart(product.id.toString(), true);
      totalPrice += product.price;
    }
  });

  test.beforeEach(async () => {
    await mainPage.navigateTo('/');
    await mainPage.waitForResponse('post', '/check');
    await mainPage.verifyLoggedInUser(username);
    response = await mainPage.openCartPage();
    itemsInCart = response.Items;
  });

  test.afterAll(async () => {
    await asyncForEach(itemsInCart, async (item: any) => {
      await cart.deleteItemFromCart(item.id);
    });
    await browser.close();
  });

  test('verify cart page view', async () => {
    await cartPage.verifyCartPage(itemsInCart.length, totalPrice.toString());
  });

  test('should delete item from cart', async () => {
    cartPage.focusOnItem(product.title);
    await cartPage.deleteItem();
    totalPrice -= product.price;
    await cartPage.verifyCartPage(
      itemsInCart.length - 1,
      totalPrice.toString(),
    );
  });

  test('should open place order modal', async () => {
    await cartPage.placeOrder();
    await orderModal.verifyPlaceOrderModal();
  });
});
