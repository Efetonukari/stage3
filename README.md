# Zedu API Automation Framework

![CI Status](https://github.com/Efetonukari/stage3/actions/workflows/ci.yml/badge.svg)

A robust, automated API testing framework designed to validate the Zedu backend endpoints. This project enforces strict API contracts, deep schema validation, and automated Continuous Integration.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Testing Framework:** Jest
* **HTTP Assertions:** Supertest
* **Schema Validation:** Joi
* **CI/CD:** GitHub Actions

## 📌 CI/CD Pipeline Architecture
This project utilizes GitHub Actions for Continuous Integration (`.github/workflows/ci.yml`). 
* **Triggers:** The pipeline executes automatically on every `push` and `pull_request` to the main branch.
* **Execution:** It provisions an Ubuntu environment, strictly installs dependencies via `npm ci`, and runs the Jest test suite.
* **Failure Handling:** If any API contract is violated (e.g., unexpected status codes or schema mismatches), the pipeline exits with a non-zero code, failing the build and preventing bad code from merging. No manual intervention is required.
* **Artifacts:** Test results are formatted using `jest-junit` and uploaded as downloadable XML artifacts.

## 📊 Test Coverage Reporting
This framework enforces strict coverage metrics using Jest's built-in Istanbul coverage engine. 
* Executing `npm test` automatically generates a coverage matrix in the terminal.
* Detailed HTML reports are generated in the `coverage/` directory.
* **CI Artifacts:** Every GitHub Action run automatically zips and attaches the full coverage report alongside the JUnit XML results for management review.

## 📂 Project Structure
```text
├── .github/workflows/    # CI/CD pipeline configuration
├── tests/                # Jest test suites (auth, users, organisations)
├── utils/                # Helper functions (api config, auth logic)
│   └── schemas.ts        # Joi validation schemas
├── .env.example          # Template for environment variables
├── package.json          # Dependencies and test scripts
└── README.md