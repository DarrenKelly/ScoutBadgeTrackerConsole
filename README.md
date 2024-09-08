# ScoutBadgeTrackerConsole

Desktop application for ScoutBadgeTracker with Vue 3.
Should have all the functionality as ScoutBadgeTracker with additional desktop features.
ScoutBadgeTracker was originally intened as the mobile app version of this system. In
practice we now have just this app which adapts itself to mobile in part by hiding 
desktop-only functionality.

NOTES:
 Test using http://localhost:8080/ rather than the explicit IP address of the dev box - the latter will cause a log in error.

 To deploy
  firebase use scoutbadgestest
  npm run build
  firebase deploy --only hosting:scoutbadgestest

  to switch between production and test:
    swap the default and not-default values in .firebaserc
    swap which of the Pruduction and Test blockes is commented out in firebaseInit.js (this is not uploaded to github as it contains login secrets) 
    In main.css change the scoutpurple value between the production and test values.

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
