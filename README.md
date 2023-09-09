# ScoutBadgeTrackerConsole
Desktop application for ScoutBadgeTracker with Vue 3.
Should have all the functionality as ScoutBadgeTracker with additional desktop features.
ScoutBadgeTracker is intened as a mobile app. Its HTML and CSS are expected to diverge 
from ScoutBadgeTrackerConsole. At some point shared functionality will be refactored to
a shared library.

NOTES:
 Test using http://localhost:8080/ rather than the explicit IP address of the dev box - the latter will cause a log in error.

 To deploy
  firebase use scoutbadgestest
  npm run build
  firebase deploy --only hosting:scoutbadgestest


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
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
