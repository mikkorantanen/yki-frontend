# YKI-Frontend

Web client for National Certificates of Language Proficiency service (Yleisten Kielitutkintojen Ilmottautumisjärjestelmä).

## Getting Started

```bash
npm install       # install dependencies
npm start         # start the development server on localhost:3000
npm test          # run the Jest test suite
npm run build     # create an optimized production build
```

## Project Structure

```bash
src
├── assets        # Logo, images etc.
├── components    # Stateless (functional) components
├── containers    # Stateful components
└── hoc           # Higher-Order Components
```

## E2E Tests

[Cypress](https://docs.cypress.io/) is used for end to end testing.

Open Cypress Test Runner.
```bash
npm run cypress:open
```

Run all tests headlessly in the Electron browser.
```bash
npm run cypress:run
```

### License

YKI is licensed under the [EUPL](./LICENSE).
