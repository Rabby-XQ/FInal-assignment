## How to Run Tests
1. Run All Tests in terminal: "npx playwright test"
2. For ui test: "npx playwright test --ui"
2. For q1 answer type- npx playwright test q1.spec.js --headed
3. For q2 answer type- npx playwright test q2.spec.js --headed
4. For q3 answer type- npx playwright test q3.spec.js --headed


To making the Allure report:
1. npx playwright test --reporter=line,allure-playwright
2. npx allure generate allure-results --clean -o allure-report
3. npx allure open allure-report