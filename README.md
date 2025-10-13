# Playwright Test Project - DemoBlaze

A comprehensive end-to-end testing framework built with Playwright for the DemoBlaze e-commerce application. This project demonstrates best practices in test automation including Page Object Model, API testing, authentication handling, and parallel test execution.

## 🚀 Features

- **Hybrid Testing**: Both UI and API test automation
- **Page Object Model**: Maintainable and reusable page components
- **Authentication Management**: Global auth setup with session state reuse
- **Parallel Execution**: Optimized test performance
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Test Reporting**: HTML reports with traces and screenshots
- **TypeScript**: Full type safety and IntelliSense support

## 📁 Project Structure

```
playwright-test-project-demoblaze/
├── api/                          # API request handlers
│   ├── Authorization.ts          # Authentication API methods
│   ├── BaseRequest.ts           # Base class for API requests
│   ├── Cart.ts                  # Cart-related API operations
│   └── Products.ts              # Product API operations
├── pages/                       # Page Object Model classes
│   ├── BasePage.ts             # Base page with common methods
│   ├── CartPage.ts             # Cart page interactions
│   ├── LoginPage.ts            # Login page functionality
│   ├── MainPage.ts             # Main page operations
│   ├── OrderModal.ts           # Order placement modal
│   ├── ProductPage.ts          # Product detail page
│   └── SuccessModal.ts         # Success confirmation modal
├── support/                     # Test utilities and configurations
│   ├── helpers.ts              # Helper functions
│   ├── types.ts                # TypeScript type definitions
│   └── constants/
│       └── Endpoints.ts        # API endpoint constants
├── tests/                       # Test specifications
│   ├── auth.setup.ts           # Global authentication setup
│   ├── API/                    # API test suites
│   │   ├── authorization.spec.ts
│   │   └── product.spec.ts
│   └── UI/                     # UI test suites
│       ├── cart-page.spec.ts
│       ├── main-page.spec.ts
│       └── place-order.spec.ts
├── .auth/                      # Authentication state storage
├── playwright-report/          # Generated test reports
├── test-results/              # Test execution artifacts
├── playwright.config.ts       # Playwright configuration
└── package.json              # Project dependencies and scripts
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd playwright-test-project-demoblaze
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   BASE_URL=https://demoblaze.com
   BASE_URL_API=https://api.demoblaze.com
   USERNAME=your_test_username
   PASSWORD=your_test_password
   ```

## 🧪 Running Tests

### All Tests
```bash
npm test
```

### UI Tests Only
```bash
npm run test:ui
```

### API Tests Only
```bash
npm run test:api
```

### Interactive Mode (Test Explorer)
```bash
npm run test:headed
```

### Debug Mode
```bash
npx playwright test --debug
```

### Specific Test File
```bash
npx playwright test tests/UI/main-page.spec.ts
```

## 📊 Test Reports

After test execution, view the HTML report:
```bash
npx playwright show-report
```

The report includes:
- Test execution summary
- Screenshots of failures
- Video recordings (if configured)
- Network traces for debugging
- Performance metrics

## 🏗️ Architecture

### Page Object Model
The project uses the Page Object Model pattern to encapsulate page-specific logic:

- **BasePage**: Common functionality shared across all pages
- **Specific Pages**: Individual page classes extending BasePage
- **Modular Design**: Each page handles its own elements and actions

### API Testing Framework
API tests are structured with:

- **BaseRequest**: Common HTTP request handling
- **Specific API Classes**: Domain-specific API operations
- **Response Validation**: Comprehensive response checking
- **Authentication**: Token-based authentication handling

### Authentication Strategy
The project implements a global authentication setup:

1. **Global Setup**: Runs once before all tests
2. **Session Storage**: Saves authenticated state to JSON
3. **State Reuse**: Tests inherit the authenticated session
4. **Performance**: Eliminates repeated login operations

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Parallel Execution**: Tests run in parallel for faster execution
- **Browser Support**: Configured for Chromium (Firefox/WebKit available)
- **Retry Logic**: Automatic retries on CI environments
- **Base URL**: Centralized URL management
- **Trace Collection**: Debugging traces on test failures

### Test Organization
- **API Tests**: Located in `tests/API/`
- **UI Tests**: Located in `tests/UI/`
- **Setup Tests**: Authentication and global setup
- **Naming Convention**: `*.spec.ts` for test files

## 🚦 Best Practices

### Test Writing
- Use Page Object Model for UI interactions
- Implement proper wait strategies
- Add meaningful assertions
- Use descriptive test names
- Group related tests in describe blocks

### Maintenance
- Keep page objects updated with UI changes
- Maintain API contracts in separate classes
- Use environment variables for configuration
- Implement proper error handling
- Add logging for debugging

### Performance
- Leverage parallel execution
- Reuse authentication state
- Minimize unnecessary waits
- Use efficient selectors
- Cache frequently used elements

## 🐛 Debugging

### Common Commands
```bash
# Run with browser visible
npx playwright test --headed

# Debug specific test
npx playwright test --debug tests/UI/main-page.spec.ts

# Generate trace files
npx playwright test --trace on

# View trace files
npx playwright show-trace trace.zip
```

### Troubleshooting
1. **Authentication Issues**: Check `.env` file and credentials
2. **Element Not Found**: Verify selectors in page objects
3. **Timeouts**: Increase timeout values or improve wait strategies
4. **API Failures**: Check network connectivity and endpoint URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Format code: `npm run format`
6. Commit your changes: `git commit -m 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DemoBlaze Application](https://demoblaze.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📧 Support

For questions or issues, please:
1. Check the existing documentation
2. Search through existing issues
3. Create a new issue with detailed information
4. Include test logs and error messages

---

**Happy Testing!** 🎭