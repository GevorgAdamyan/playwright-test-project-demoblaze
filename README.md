# Playwright Test Project - DemoBlaze

A comprehensive end-to-end testing framework built with Playwright for the DemoBlaze e-commerce
application. This project demonstrates best practices in test automation including Page Object
Model, API testing, authentication handling, and parallel test execution.

## 🚀 Features

- **Hybrid Testing**: Both UI and API test automation
- **Page Object Model**: Maintainable and reusable page components
- **Authentication Management**: Global auth setup with session state reuse
- **Manual Test Execution**: Three separate workflows for flexible testing
- **Code Quality Automation**: Automated linting, formatting, and type checking
- **Developer-Friendly**: Relaxed ESLint configuration prioritizing development velocity
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
│   └── constants/              # Constants and configuration
│       ├── endpoint.ts         # API endpoint constants
│       ├── errors_and_messages.ts # Error messages and text constants
│       ├── methods.ts          # HTTP method constants
│       ├── test_data.ts        # Test data constants
│       └── variables.ts        # General variable constants
├── tests/                       # Test specifications
│   ├── auth.setup.ts           # Global authentication setup
│   ├── API/                    # API test suites
│   │   ├── authorization.spec.ts
│   │   └── product.spec.ts
│   └── UI/                     # UI test suites
│       ├── cart-page.spec.ts
│       ├── main-page.spec.ts
│       └── place-order.spec.ts
├── .github/                     # GitHub Actions workflows
│   └── workflows/
│       ├── code-quality.yml   # Automated code quality checks
│       ├── playwright.yml     # All tests (manual trigger)
│       ├── playwright-api.yml # API tests only (manual trigger)
│       └── playwright-ui.yml  # UI tests only (manual trigger)
├── .auth/                      # Authentication state storage
├── playwright-report/          # Generated test reports
├── test-results/              # Test execution artifacts
├── eslint.config.js           # ESLint configuration (relaxed)
├── .prettierrc                # Prettier formatting rules (main config)
├── .prettierrc.json           # Prettier JSON configuration (alternative)
├── .prettierignore            # Prettier ignore patterns
├── .gitignore                 # Git ignore rules
├── .env                       # Environment variables (local)
├── tsconfig.json              # TypeScript configuration
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
   git clone https://github.com/GevorgAdamyan/playwright-test-project-demoblaze.git
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

4. Set up environment variables: Create a `.env` file in the root directory with the following
   variables:
   ```env
   BASE_URL=https://demoblaze.com
   BASE_URL_API=https://api.demoblaze.com
   USERNAME=your_test_username
   PASSWORD=your_test_password
   ```

## 📦 Dependencies Overview

### Production Dependencies
- **dotenv** (^17.2.3): Environment variable management
- **prettier** (^3.6.2): Code formatting and style enforcement

### Development Dependencies
- **@playwright/test** (^1.56.0): Core Playwright testing framework
- **@types/dotenv** (^6.1.1): TypeScript types for dotenv
- **@types/node** (^24.7.2): TypeScript types for Node.js
- **@typescript-eslint/eslint-plugin** (^8.8.0): ESLint rules for TypeScript
- **@typescript-eslint/parser** (^8.8.0): TypeScript parser for ESLint
- **depcheck** (^1.4.7): Unused dependency detection tool
- **eslint** (^9.11.1): JavaScript/TypeScript linting utility
- **eslint-config-prettier** (^9.1.0): ESLint config that disables formatting rules
- **eslint-plugin-playwright** (^1.6.2): Playwright-specific ESLint rules
- **typescript** (^5.6.2): TypeScript compiler and type checker

## 🧪 Running Tests

### Local Test Execution

#### All Tests

```bash
npm test
```

#### UI Tests Only

```bash
npm run test:ui
```

#### API Tests Only

```bash
npm run test:api
```

#### Interactive Mode (Test Explorer)

```bash
npm run test:headed
```

#### Debug Mode

```bash
npx playwright test --debug
```

#### Specific Test File

```bash
npx playwright test tests/UI/main-page.spec.ts
```

### GitHub Actions (Manual Trigger Only)

All test workflows require manual triggering via GitHub Actions:

1. **Go to Actions Tab**: Navigate to your repository's Actions tab
2. **Select Workflow**: Choose from three available workflows:
   - **"Playwright Tests - All Tests"**: Runs both UI and API tests
   - **"Playwright Tests - API Only"**: Runs only API tests (faster)
   - **"Playwright Tests - UI Only"**: Runs only UI tests
3. **Run Workflow**: Click "Run workflow" → Select branch → Click "Run workflow"

### Code Quality Checks (Automatic)

Code quality checks run automatically on every push and pull request:

- ✅ **Prettier**: Code formatting validation (dual config: .prettierrc + .prettierrc.json)
- ✅ **ESLint**: Linting with relaxed rules (up to 50 warnings allowed)
- ✅ **TypeScript**: Basic type checking with relaxed strictness
- ✅ **Dependencies**: Unused package detection via depcheck
- ✅ **Security**: Vulnerability audit via npm audit

#### Manual Code Quality Commands

```bash
npm run format        # Fix formatting issues
npm run format:check  # Check formatting without fixing
npm run lint          # Run ESLint
npm run lint:fix      # Fix auto-fixable linting issues
npm run type-check    # Run TypeScript type checking
npm run quality       # Run all quality checks
npm run quality:fix   # Fix formatting and linting issues
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

### Code Quality Framework

Automated code quality checks ensure consistent code standards:

- **ESLint Configuration**: Modern flat config with relaxed rules prioritizing development velocity
- **Prettier Integration**: Dual configuration support (.prettierrc + .prettierrc.json)
- **TypeScript Checking**: Relaxed type safety (strict: false) for easier development
- **GitHub Actions**: Automated quality gates on push/PR events with non-blocking approach
- **Developer Friendly**: Up to 50 warnings allowed, continue-on-error for most checks

### Modular Project Organization

The project follows a well-organized modular structure:

- **Separation of Concerns**: Clear distinction between pages, API handlers, and utilities
- **Constants Management**: Centralized constants in organized sub-modules for maintainability
- **Helper Functions**: Reusable utility functions for common operations (encoding, ID generation, async iteration)
- **Type Safety**: TypeScript interfaces and types for better development experience
- **Configuration Files**: Multiple config files for different tools (ESLint, Prettier, TypeScript)
- **Environment Management**: Local .env file support with proper gitignore handling

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

### GitHub Actions Workflows

- **code-quality.yml**: Automatic code quality checks (runs on push/PR)
- **playwright.yml**: Manual all tests execution
- **playwright-api.yml**: Manual API tests only
- **playwright-ui.yml**: Manual UI tests only

### Code Quality Configuration

- **eslint.config.js**: Modern ESLint flat config with relaxed rules for development velocity
- **.prettierrc**: Main Prettier configuration file with comprehensive formatting rules
- **.prettierrc.json**: Alternative JSON-based Prettier configuration
- **.prettierignore**: Files and patterns excluded from formatting
- **tsconfig.json**: TypeScript configuration with relaxed strictness (strict: false)
- **depcheck**: Dependency checker for unused packages (included in devDependencies)
- **GitHub Secrets**: `USERNAME` and `PASSWORD` required for workflows

### Support Files Structure

- **support/helpers.ts**: Utility functions including:
  - `b64EncodeUnicode()`: Base64 encoding for Unicode strings
  - `generateId()`: Random UUID-like ID generation
  - `asyncForEach()`: Async iteration over arrays
  - `getCurrentDateWithSlash()`: Current date formatting (DD/MM/YYYY)
- **support/types.ts**: TypeScript interface definitions (ResponseBody, etc.)
- **support/constants/**: Organized constants for better maintainability
  - **endpoint.ts**: API endpoint paths (/login, /signup, /viewcart, /addtocart, etc.)
  - **errors_and_messages.ts**: Application messages (error messages, success messages, validation text)
  - **methods.ts**: HTTP method constants (GET, POST)
  - **test_data.ts**: Test data constants and mock data for testing
  - **variables.ts**: General application variables and configuration constants

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

### Code Quality

- Run `npm run quality` before committing code
- Fix formatting issues with `npm run format`
- Address linting warnings gradually (up to 50 warnings allowed)
- Use TypeScript for better code maintainability
- Follow the relaxed ESLint rules for development velocity
- **Prettier Configuration**: Project uses dual configuration (.prettierrc and .prettierrc.json) - both are valid
- **Constants Organization**: Utilize organized constants from support/constants/ for maintainability

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
5. **GitHub Actions**: Ensure `TEST_USERNAME` and `TEST_PASSWORD` secrets are set
6. **Code Quality**: Check workflow logs for specific linting or formatting issues
7. **Manual Workflows**: Use Actions tab to manually trigger test workflows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run quality checks: `npm run quality` (optional - warnings allowed)
5. Run the test suite locally: `npm test`
6. Format code: `npm run format`
7. Commit your changes: `git commit -m 'Add new feature'`
8. Push to the branch: `git push origin feature/new-feature`
9. Submit a pull request (code quality checks will run automatically)

### GitHub Actions Setup

If you're setting up workflows, ensure these repository secrets are configured:

- `TEST_USERNAME`: Valid test account username
- `TEST_PASSWORD`: Corresponding test account password

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
