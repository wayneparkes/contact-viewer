# Contact Viewer App

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run all unit tests
```bash
npm test
```

Run all unit tests and generate a coverage report
> Report location: `/coverage/lcov-report/index.html`
```bash
npm run test:coverage
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
