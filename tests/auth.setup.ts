/**
 * Authentication Setup for Playwright Tests
 *
 * This file provides a global authentication setup that runs before test suites
 * to establish an authenticated session state. This approach improves test performance
 * by avoiding repeated login operations in individual tests.
 *
 * Purpose:
 * - Performs one-time authentication using environment credentials
 * - Stores the authenticated session state (cookies, localStorage, etc.) to a file
 * - Enables tests to reuse the authenticated state instead of logging in repeatedly
 *
 * Benefits:
 * - Faster test execution (no login overhead per test)
 * - Consistent authentication state across test runs
 * - Separation of authentication logic from business logic tests
 * - Better test isolation and reliability
 *
 * Usage:
 * - Configure this setup in playwright.config.ts as a global setup
 * - Tests can use the stored state by configuring storageState in test context
 * - The stored authentication state is available in '.auth/state.json'
 */

import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';

let mainPage: MainPage;
let loginPage: LoginPage;

setup('authentication', async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new LoginPage(page);
  await mainPage.navigateTo('/');
  await mainPage.openLoginModal();
  await loginPage.login(
    process.env.USERNAME as string,
    process.env.PASSWORD as string,
  );
  await page.context().storageState({ path: '.auth/state.json' });
});
