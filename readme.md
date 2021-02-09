# Speed Viz

The purpose of this project is to reproduce this post:

<https://t.co/17lVtXui8r>

My visualization is running here:

<https://chemotaxis.github.io/speed-viz/>

## Development

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).  Here's more info about
[React](readme-react.md).

Initially created React app using this:

```shell
npx create-react-app speedviz --use-npm
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployment

Currently deploys using GitHub Pages using this cli:

<https://github.com/tschaub/gh-pages>

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the official docs site for more information about [deploying React](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run deploy`

This pushes the contents of the `build` folder to the remote branch `gh-pages`.
Once pushed, site should be updated.
