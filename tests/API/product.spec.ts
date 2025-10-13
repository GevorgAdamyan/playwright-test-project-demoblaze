import dotenv from 'dotenv';
import Products from '../../api/Products';
import Cart from '../../api/Cart';
import test, { expect } from '@playwright/test';
import { asyncForEach } from '../../support/Helpers';
dotenv.config();

const products = new Products();
const cart = new Cart();
const categories = ['phone', 'notebook', 'monitor'];
let response: any;
let cartItems: any;

test.describe('Products', () => {
    test.beforeAll(async () => {
        response = await products.getEntries();
        expect(response.statusCode).toBe(200);
    });

    test.afterAll(async () => {
        cartItems = await cart.getItemsInCart(true);
        await asyncForEach(cartItems.body.Items, async (item: any) => {
            await cart.deleteItemFromCart(item.id);
        });
    });


    test('should get all products', async () => {
        response.body.Items.forEach((item: any) => {
            expect(typeof item.id).toBe('number');
            expect(typeof item.title).toBe('string');
            expect(typeof item.price).toBe('number');
            expect(typeof item.desc).toBe('string');
            expect(typeof item.cat).toBe('string');
            expect(typeof item.img).toBe('string');
        });
    });

    test('should get product by id', async () => {
        await asyncForEach(response.body.Items, async (item: any) => {
            const resById = await products.getProductById(item.id);
            expect(resById.statusCode).toBe(200);
            expect(resById.body.id).toBe(item.id);
            expect(resById.body.title).toBe(item.title);
            expect(resById.body.price).toBe(item.price);
            expect(resById.body.desc).toBe(item.desc);
            expect(resById.body.cat).toBe(item.cat);
            expect(resById.body.img).toBe(item.img);
        });
    });

    test('should return error for non-existing product id', async () => {
        const resById = await products.getProductById('999999');
        expect(resById.statusCode).toBe(200);
        expect(resById.body.errorMessage).toBe('Not found.');
    });

    for (const category of categories) {
        test(`should get products by category; ${category}`, async () => {
            const resByCategory = await products.getProductsByCategory(category);
            expect(resByCategory.statusCode).toBe(200);
            resByCategory.body.Items.forEach((item: any) => {
                expect(item.cat.toLowerCase()).toBe(category);
            });
        });
    }

    test('should return error for non-existing category', async () => {
        const resByCategory = await products.getProductsByCategory('non-existing-category');
        expect(resByCategory.statusCode).toBe(200);
        expect(resByCategory.body.Items.length).toEqual(0);
    });

    test('should add product to cart', async () => {
        const product = response.body.Items[0];
        const addToCartRes = await products.addProductToCart(product.id.toString(), true);
        expect(addToCartRes.statusCode).toBe(200);
        cartItems = await cart.getItemsInCart(true);
        expect(cartItems.statusCode).toBe(200);
        cartItems.body.Items.forEach((item: any) => {
            expect(typeof item.id).toBe('string');
            expect(item.cookie).toBe(process.env.USERNAME);
            expect(typeof item.prod_id).toBe('string');
        });
        const addedItem = cartItems.body.Items.find((item: any) => item.prod_id === product.id.toString());
        expect(addedItem).toBeDefined();
    });
});
