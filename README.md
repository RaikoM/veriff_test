# Veriff Test Assignment

## Objective
Implement answering checks interface - the part of [Verification Tool](https://www.veriff.com/product/identity-verification-tool)


## Solution
After reading the assignment I decided to use external libraries like `react-query` and `final-form` to help me manage form state and async data fetching. <br>
- Initially user will be shown a loader while checks are being fetched.
- If fetching checks fails user will see error message with button to try and get checks again
- Once checks are fetched user can fill out checks interface and click "Submit"
- If submitting checks fails user will see error toast and can attempt to submit again
- When checks are successfully submitted user will see success screen

#### Alternative solution if external libraries were not allowed
- Fetching data - Instead of using `react-query` it could be done via window.fetch which is built in to browsers and managing loading/error state manually inside a try catch block.
- Managing state - Form could be wrapped in context and field changes would update form state accordingly (focus, blur, change etc...)

## Notes
- Currently, all components are together inside components folder. In a bigger application it would make sense to separate presentational and container components
- Not sure if all checked values after no should also be removed on submit.
- Not checking case of check value (yes/no) because CheckResult type accepts only lowercase value
- In real applications api calls would be mocked by `msw` or mock api

## Used tools

#### `react-query`
Used for fetching checks from `fetchChecks` and submitting checks to `submitCheckResults`. <br>
Also takes care of async error handling and error-boundary state.

#### `react-error-boundary`
Used to display error boundary if `fetchChecks` fails.

#### `react-hot-toast`
Used to display error toast if `submitCheckResults` fails.

#### `final-form` / `react-final-form`
Used to manage checks form state, enabling/disabling fields and submit button.<br>
This library was chosen out of convenience and familiarity.<br>Other form state management libraries like `formik` or `react-hook-form` would work also.

#### `eslint` / `prettier`
Used to analyse and format code

## Setup

#### `yarn install`
Installs the required dependencies.

#### `yarn start`
Runs the app in the development mode. <br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`
Launches the test runner in watch mode.

#### `yarn test:coverage`
Launches the test runner and displays coverage. Is not running in watch mode.

#### `yarn build`
Builds the app for production to the `build` folder.
