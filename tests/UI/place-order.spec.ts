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
import { DELETE_CART } from '../../support/constants/Endpoints';
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

const name = 'John Doe';
const card = '1234567812345678';
const country = 'USA';
const city = 'New York';
const month = '12';
const year = '2025';

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
        await mainPage.waitForResponse('post', '/check');
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
        orderModal.handleAlert('Please fill out Name and Creditcard.');
    });

    test('should place order with valid fields', async () => {
        await orderModal.insertTextInModal('Name', name);
        await orderModal.insertTextInModal('Country', country);
        await orderModal.insertTextInModal('City', city);
        await orderModal.insertTextInModal('Card', card);
        await orderModal.insertTextInModal('Month', month);
        await orderModal.insertTextInModal('Year', year);
        await orderModal.purchase();
        await orderModal.waitForResponse('post', DELETE_CART);
        await successModal.verifySuccessModal(
            name,
            card,
            totalPrice.toString(),
            getCurrentDateWithSlash(),
        );
        await successModal.closeModal();
    });
});
