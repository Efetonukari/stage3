# Zedu API Automation Framework

![CI Status](https://github.com/Efetonukari/stage3/actions/workflows/ci.yml/badge.svg)

## 📌 CI/CD Pipeline Architecture
This project utilizes GitHub Actions for Continuous Integration (`.github/workflows/ci.yml`). 
* **Triggers:** The pipeline executes automatically on every `push` and `pull_request` to the main branch.
* **Execution:** It provisions an Ubuntu environment, strictly installs dependencies via `npm ci`, and runs the Jest test suite.
* **Failure Handling:** If any API contract is violated (a test fails), the pipeline exits with a non-zero code, failing the build and preventing bad code from merging. No manual intervention is required.
* **Artifacts:** Test results are formatted using `jest-junit` and uploaded as downloadable XML artifacts.

## 🚀 Local Setup Instructions
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following variables:
   - `BASE_URL`
   - `TEST_USER_EMAIL`
   - `TEST_USER_PASSWORD`
4. Run tests: `npm test`