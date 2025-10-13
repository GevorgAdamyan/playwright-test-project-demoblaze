import dotenv from 'dotenv';
import Authorization from '../../api/Authorization';
import test, { expect } from '@playwright/test';
dotenv.config();

const authorization = new Authorization();
let username: string;
let password: string;
let response: any;

test.describe('Authorization', () => {
  test.describe.configure({ mode: 'default' });
  test.beforeAll(async () => {
    username = `test${Date.now()}`;
    password = 'Test1234';
    response = await authorization.signupUser(username, password);
    expect(response.statusCode).toBe(200);
  });

  test('Login user', async () => {
    response = await authorization.loginUser(username, password);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe('string');
  });

  test('Login user with wrong credentials', async () => {
    response = await authorization.loginUser('wrongusername', 'wrongpassword');
    expect(response.statusCode).toBe(200);
    expect(response.body.errorMessage).toEqual('Wrong password.');
  });

  test('Signup user with existing username', async () => {
    response = await authorization.signupUser(username, password);
    expect(response.statusCode).toBe(200);
    expect(response.body.errorMessage).toEqual('This user already exist.');
  });

  test('Signup user with empty username', async () => {
    response = await authorization.signupUser('', password);
    expect(response.statusCode).toBe(500);
  });

  test('Login user with empty username', async () => {
    response = await authorization.loginUser('', password);
    expect(response.statusCode).toBe(500);
  });

  test('Login user with empty password', async () => {
    response = await authorization.loginUser(username, '');
    expect(response.statusCode).toBe(200);
    expect(response.body.errorMessage).toEqual('Wrong password.');
  });
});
