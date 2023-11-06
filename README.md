# Contact Viewer App

## Getting Started

```bash
# Install the dependencies
npm i

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

#### Unit Testing
[React Testing Library](https://github.com/testing-library/react-testing-library#readme) is used for unit testing

```bash
# run all tests
npm test

# run a specific test
npm test filename.test.tsx

# run all tests then generate coverage report
# Report location: `/coverage/lcov-report/index.html`
npm run test:coverage
```

#### E2E Testing
[Cypress](https://github.com/cypress-io/cypress#readme) is used for E2E testing
> Note: The development server will start automatically with the `e2e` commands

```bash
# run all tests in interactive mode
npm run e2e

# run all tests headlessly then generate videos of passing features or screenshots of failing features
# Video location: `/cypress/videos`
# Screenshot location: `/cypress/screenshots`
npm run e2e:headless
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript

## Functionality

- Ability to view, add, edit and delete contact cards
- Clicking a card discloses more information
- Search field utilises a datalist of contact names for suggestive search
- API actions are carried out within a modal overlay
