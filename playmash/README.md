<p align="center">
    <img src="mash.png" width="400px">
    <div align="center">
        <img src="https://img.shields.io/github/actions/workflow/status/alxwrd/playmash/deploy.yml">
        <img src="https://img.shields.io/website?url=https%3A%2F%2Fplaymash.online">
    </div>
</p>

---

An implementation of the fortune telling game MASH with Vue 3 available at https://playmash.online/.

[How to Play MASH](https://www.youtube.com/watch?v=iaZ9m39-BbE)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
