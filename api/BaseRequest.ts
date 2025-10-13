import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { ResponseBody } from '../support/types';
import * as cookies from '../.auth/state.json';

/**
 * Abstract base class for API request handling with Playwright
 * Provides common functionality for making HTTP requests and handling responses
 */
export default abstract class BaseRequest {
  /**
   * Makes an HTTP request to the specified endpoint using the provided method and configuration
   * @param method - The HTTP method to use (GET, POST, PUT, DELETE, etc.)
   * @param endpoint - The API endpoint path to append to the base URL
   * @param config - Configuration object containing headers, data, and other request options
   * @returns Promise that resolves with a ResponseBody containing status code, status text, and parsed JSON body
   * @throws Error if the request fails or response cannot be parsed
   * @protected
   */
  protected async makeRequest(
    method: string,
    endpoint: string,
    config: {},
  ): Promise<ResponseBody> {
    const url: string = `${process.env.BASE_URL_API}${endpoint}`;
    console.log(`Request: ${method.toUpperCase()} ${url}`);
    const apiContext: APIRequestContext = await request.newContext();
    const response: APIResponse = await (apiContext as any)[method](
      url,
      config,
    );
    let responseBody: any;
    try {
      responseBody = await response.json();
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
    }
    const res: ResponseBody = {
      statusCode: response.status(),
      statusText: response.statusText(),
      body: responseBody,
    };
    return res;
  }

  /**
   * Creates a configuration object for HTTP requests with default headers and authentication
   * @param body - Optional request body data to include in the configuration
   * @returns Configuration object with headers, authentication token, and optional data payload
   * @protected
   */
  protected config(body?: {}): {} {
    const configuration: any = {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6',
        origin: process.env.BASE_URL,
        referer: process.env.BASE_URL,
      },
    };
    const token = cookies.cookies.find(
      cookie => cookie.name === 'tokenp_',
    )?.value;
    if (body) {
      configuration['data'] = body;
      configuration.data['cookie'] = token;
    }
    return configuration;
  }
}
