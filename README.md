# Zedu TypeScript API Automation Suite

A comprehensive TypeScript API automation and testing suite for the Zedu platform. This project uses Jest and Supertest to provide automated testing coverage for API endpoints with a focus on positive scenarios, negative scenarios, and edge cases.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [API Modules](#api-modules)
- [Utilities](#utilities)
- [Technologies](#technologies)
- [Test Writing Guidelines](#test-writing-guidelines)
- [Contributing](#contributing)

## 🎯 Overview

This project provides automated testing for the Zedu API (v1), covering the following functional areas:

- **Authentication** - Login, token management, and authorization
- **User Management** - User creation, retrieval, and management
- **Profile Management** - User profile operations
- **Organizations** - Organization-related functionality

The test suite is organized into three categories for each module:
- **Positive Tests** - Valid requests and successful scenarios
- **Negative Tests** - Invalid inputs, error handling, and authentication failures
- **Edge Cases** - Boundary conditions and special scenarios

## 📁 Project Structure

```
qa_test/
├── tests/                          # Test files directory
│   ├── auth/                       # Authentication API tests
│   │   ├── auth.positive.test.ts   # Valid login and auth scenarios
│   │   ├── auth.negative.test.ts   # Auth failures and errors
│   │   └── auth.edge-cases.test.ts # Edge cases for auth
│   ├── users/                      # User management tests
│   │   ├── users.positive.test.ts  # Valid user operations
│   │   ├── users.negative.test.ts  # Invalid user operations
│   │   └── users.edge-cases.test.ts # User edge cases
│   ├── profile/                    # User profile tests
│   │   ├── profile.positive.test.ts # Valid profile operations
│   │   ├── profile.negative.test.ts # Profile error scenarios
│   │   └── profile.edge-cases.test.ts # Profile edge cases
│   └── organisations/              # Organization tests
│       ├── organisations.positive.test.ts # Valid org operations
│       ├── organisations.negative.test.ts # Org error scenarios
│       └── organisations.edge-cases.test.ts # Org edge cases
├── utils/                          # Utility functions and helpers
│   ├── api.ts                      # API request configuration
│   ├── auth.ts                     # Authentication helpers
│   └── schema.ts                   # Validation schemas
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript compiler configuration
├── jest.config.cjs                 # Jest test runner configuration
└── README.md                       # This file
```

## 📦 Prerequisites

- **Node.js** v16.0.0 or higher
- **npm** v7.0.0 or higher
- Valid Zedu API credentials for testing
- Internet access to reach the Zedu API

## 🚀 Installation

1. **Clone the repository** or navigate to the project directory:
   ```bash
   cd qa_test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   ```bash
   npm test -- --listTests
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root directory with the following variables:

```env
# API Configuration
BASE_URL=https://api.zedu.chat/api/v1

# Test User Credentials
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password

# Optional
NODE_ENV=test
```

**⚠️ Security Note**: Ensure your `.env` file is added to `.gitignore` to prevent committing sensitive credentials.

### TypeScript Configuration

The project uses strict TypeScript settings:
- **Module System**: CommonJS
- **Target**: ESNext
- **Type Checking**: Strict mode enabled
- **JSX**: React-JSX support
- **Source Maps**: Enabled for debugging

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

Runs all tests with verbose output and sequential execution (recommended for API tests to avoid conflicts).

### Run Tests for Specific Module
```bash
npm test -- auth.positive.test.ts
npm test -- users.negative.test.ts
npm test -- organisations
```

### Run Tests Matching Pattern
```bash
npm test -- --testNamePattern="negative"
npm test -- --testNamePattern="login"
npm test -- --testNamePattern="auth"
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

Generates a coverage report showing line, branch, function, and statement coverage.

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

Reruns tests automatically when files change (useful during development).

### Run Single Test File
```bash
npm test -- tests/auth/auth.positive.test.ts
```

## 📊 Test Organization

### Test Categories

Each API module includes three types of test files, following a structured testing strategy:

#### 1. Positive Tests (`.positive.test.ts`)
Tests valid API requests with correct data and valid authentication.

**Examples**:
- ✅ Successful user login with correct credentials
- ✅ Creating a new user with valid data
- ✅ Fetching user profile with valid authorization token
- ✅ Updating organization details with valid information

**Assertions**: HTTP 200/201 responses, correct data structure, expected fields present

#### 2. Negative Tests (`.negative.test.ts`)
Tests invalid inputs, authentication failures, and error conditions.

**Examples**:
- ❌ Login with incorrect password (401 Unauthorized)
- ❌ API request without authorization token (401 Unauthorized)
- ❌ Creating user with missing required fields (400 Bad Request)
- ❌ Accessing profile with invalid/expired token (403 Forbidden)

**Assertions**: HTTP 400/401/403/404 responses, error messages, proper error handling

#### 3. Edge Cases (`.edge-cases.test.ts`)
Tests boundary conditions, special inputs, and unusual scenarios.

**Examples**:
- 🔍 Very long strings in input fields
- 🔍 Special characters and Unicode in user data
- 🔍 Concurrent requests to the same endpoint
- 🔍 Null or empty values in non-required fields
- 🔍 SQL injection and XSS payload attempts
- 🔍 Boundary values (max/min integers, extreme dates)

**Assertions**: Proper handling of edge cases without crashes or unexpected behavior

## 🔌 API Modules

### Authentication (`/auth`)
Manages user login and JWT token generation.

**Endpoints**:
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate user and receive JWT token |

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "status": 200,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
}
```

### Users (`/users`)
User account management and operations.

**Endpoints**:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users (requires auth) |
| POST | `/users` | Create new user |
| GET | `/users/:id` | Get specific user (requires auth) |
| PUT | `/users/:id` | Update user (requires auth) |
| DELETE | `/users/:id` | Delete user (requires auth) |

### Profile (`/users/me`)
Current user profile operations.

**Endpoints**:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user profile (requires auth) |
| PUT | `/users/me` | Update current user profile (requires auth) |

**Headers** (required):
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

### Organizations (`/organisations`)
Organization management and operations.

**Endpoints**:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/organisations` | List all organizations (requires auth) |
| POST | `/organisations` | Create new organization (requires auth) |
| GET | `/organisations/:id` | Get specific organization (requires auth) |
| PUT | `/organisations/:id` | Update organization (requires auth) |
| DELETE | `/organisations/:id` | Delete organization (requires auth) |

## 🛠️ Utilities

### api.ts
Configures the Supertest HTTP client with the base URL from environment variables.

**Exports**:
```typescript
export const request = supertest(baseURL);
```

**Usage**:
```typescript
const response = await request.get('/users/me');
```

### auth.ts
Provides authentication helper functions for test setup.

**Functions**:

- **`getAuthToken(): Promise<string>`** - Retrieves a valid JWT access token

```typescript
const token = await getAuthToken();
const response = await request
  .get('/users/me')
  .set('Authorization', `Bearer ${token}`);
```

### schema.ts
Contains Joi validation schemas for API response validation and test data structure validation.

**Usage**: Validate API responses against expected schemas to catch structural changes.

## 📊 Technologies & Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| TypeScript | ^5.4.5 | Type-safe JavaScript compilation |
| Jest | ^29.7.0 | JavaScript testing framework |
| Supertest | ^6.3.4 | HTTP assertion library for API testing |
| Joi | ^17.12.3 | Data validation library for schemas |
| Faker.js | ^8.4.1 | Generate realistic test data |
| dotenv | ^16.4.5 | Environment variable management |
| ts-jest | ^29.1.2 | Jest plugin for TypeScript support |
| @types/jest | ^29.5.12 | TypeScript definitions for Jest |
| @types/node | ^20.12.7 | TypeScript definitions for Node.js |
| @types/supertest | ^6.0.2 | TypeScript definitions for Supertest |

## 📝 Test Writing Guidelines

### Test Structure Template

```typescript
import { request } from '../../utils/api';
import { getAuthToken } from '../../utils/auth';
import { faker } from '@faker-js/faker';

describe('Feature Name - Test Category', () => {
    let token: string;

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('Should describe the specific behavior being tested', async () => {
        // Arrange: Set up test data
        const userData = {
            email: faker.internet.email(),
            name: faker.person.fullName()
        };

        // Act: Execute the API request
        const response = await request
            .get('/endpoint')
            .set('Authorization', `Bearer ${token}`);

        // Assert: Verify the response
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
    });
});
```

### Best Practices

1. **Descriptive Test Names** - Test names should clearly state the expected behavior
   ```typescript
   // ✅ Good
   it('Should return 401 status when Bearer token is invalid', async () => { ... });
   
   // ❌ Poor
   it('Should fail', async () => { ... });
   ```

2. **Follow AAA Pattern** - Arrange, Act, Assert
   - **Arrange**: Set up test data and preconditions
   - **Act**: Execute the action being tested
   - **Assert**: Verify the expected outcome

3. **Use Faker for Data Generation** - Avoid hardcoded test data
   ```typescript
   const email = faker.internet.email();
   const name = faker.person.fullName();
   ```

4. **Include Proper Authentication** - Add Bearer token to authenticated endpoints
   ```typescript
   .set('Authorization', `Bearer ${token}`)
   ```

5. **Verify Both Status and Body** - Check HTTP status codes AND response structure
   ```typescript
   expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('data');
   ```

6. **Clean Up Test Data** - Use `afterAll` hooks to delete created test resources
   ```typescript
   afterAll(async () => {
       await request.delete(`/users/${userId}`);
   });
   ```

7. **Isolate Tests** - Each test should be independent and able to run in any order
   ```typescript
   // ✅ Good: Each test has its own data
   // ❌ Bad: Tests depend on each other or previous state
   ```

8. **Organize Related Tests** - Use nested `describe` blocks for organization
   ```typescript
   describe('User Management', () => {
       describe('Creating Users', () => { ... });
       describe('Updating Users', () => { ... });
   });
   ```

## 🤝 Contributing

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/add-new-tests
   ```

2. **Add tests** following the existing structure and patterns

3. **Run all tests** to ensure nothing breaks:
   ```bash
   npm test
   ```

4. **Follow test organization guidelines**:
   - Create `.positive.test.ts`, `.negative.test.ts`, and `.edge-cases.test.ts` files
   - One file per category per module
   - Clear, descriptive test names

5. **Update this README** if adding new API modules or major changes

6. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "feat: add new API tests for X"
   git push origin feature/add-new-tests
   ```

## 📋 Test Checklist

When adding tests for a new API endpoint, ensure:

- [ ] Positive test file created with valid request scenarios
- [ ] Negative test file created with error scenarios
- [ ] Edge cases test file created with boundary conditions
- [ ] All tests use `getAuthToken()` for authenticated endpoints
- [ ] Faker.js is used for dynamic test data
- [ ] Tests are independent and can run in any order
- [ ] Response structure is validated with assertions
- [ ] Both HTTP status and body are checked
- [ ] Test data is cleaned up after execution
- [ ] Tests follow naming conventions
- [ ] All tests pass locally before submitting PR

## 🐛 Troubleshooting

### Tests Failing with "401 Unauthorized"
- Verify `.env` file exists with correct credentials
- Ensure `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` are valid
- Check API is accessible at `BASE_URL`

### Tests Timing Out
- Increase Jest timeout: `jest.setTimeout(10000)`
- Check network connectivity to API
- Verify API is not rate-limiting requests

### Module Not Found Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript paths in `tsconfig.json`
- Verify import paths are correct

### Port Already in Use
- If using local API, ensure port is available
- Kill existing process using the port

## 📄 License

[Add your license here]

## 📞 Contact & Support

For issues or questions:
- Create an issue in the repository
- Contact the QA team
- Review existing test files for examples

---

**Last Updated**: April 27, 2026
**Status**: Active & Maintained