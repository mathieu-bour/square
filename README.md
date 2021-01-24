# GitHub Action template

A TypeScript template for GitHub Actions which include the compilation toolchain as well as the required CI/CD
workflows and quality tools.

## Disclaimer

This is **my personal, opinionated** template for GitHub Actions.
I do not pretend to provide with this project a reference framework for good development practices.
However, I am open to any discussion that could lead to better results.

## Toolchain

The project toolchain is composed of multiple tools:

| Script (`npm run [script]`) | Tool | Configuration | Description                                              |
|--------|----------------------|------------------|------------------------------------------------------------|
| format | [prettier][prettier] | `.prettierc.js`  | Ensure that the code follows the code conventions.         |
| lint   | [eslint][eslint]     | `.eslintrc.js`   | Ensure that the code follows the best practices.           |
| test   | [jest][jest]         | `jest.config.js` | Run the automated (unit, integration, etc.) tests.         |
| build  | [esbuild][esbuild]   | `.esbuildrc.js`  | Build and bundle the final action code in `dist/index.js`. |

[prettier]: https://prettier.io
[eslint]: https://eslint.org
[jest]: https://jestjs.io
[esbuild]: https://esbuild.github.io