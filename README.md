# ScoutBadgeTrackerConsole

Desktop application for ScoutBadgeTracker with Vue 3.
Should have all the functionality as ScoutBadgeTracker with additional desktop features.
ScoutBadgeTracker was originally intened as the mobile app version of this system. In
practice we now have just this app which adapts itself to mobile in part by hiding
desktop-only functionality.

### Development

Test using `http://localhost:8080/` rather than the explicit IP address of the dev box - the latter will cause a log in error with Firebase authentication.

### Deployment

The project is configured for two Firebase environments: `test` and `production`.

- To deploy to the **test** environment (green theme): `npm run deploy:test`
- To deploy to the **production** environment (purple theme): `npm run deploy:prod`

These scripts handle the entire build and deployment process. There is no need to manually switch Firebase projects or edit configuration files.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
