# Plop Pack Azure NPM

[![npm](https://img.shields.io/npm/v/plop-pack-azure-npm.svg)](https://www.npmjs.com/package/plop-pack-azure-npm)

Useful to have action for [PlopJS](https://github.com/plopjs/plop). This action helps users [setup their Azure DevOps NPMRC file](https://docs.microsoft.com/en-us/azure/devops/artifacts/get-started-npm?view=azure-devops&tabs=windows#set-up-your-npmrc-files)

## Installation

```
npm i plop-pack-azure-npm
```

## Config

```javascript
{
    projectName: 'PROJ_NAME',
    registryUrl: 'pkgs.dev.azure.com/PROJ_NAME/project-uuid-999-999/_packaging/package-name/npm'
}
```

Your `registryUrl` must not contain a tailing `/` nor the `registry/` postfix or `https://` prefix

There's also an optional property you can pass to config: `progressSpinner`. It's required to use this property when using `plop` instead of `node-plop`,
as otherwise the spinner will cause problems with the input.

```javascript
const {progressSpinner} = require('plop');

const azureConfig = {
    projectName: '',
    registryUrl: '',
    progressSpinner
}

```

## Example

```javascript
module.exports = function(plop) {
  // Loads the npmInstall action type
  plop.load('plop-pack-azure-npm');

  plop.setGenerator('generate', {
    prompts: [
        // ...
    ],
    actions: function(data) {
      const actions = [];

      actions.push({
        type: 'npmInstall',
        path: `${process.cwd()}/project-name/`,
        // By default is false, but if "true" will log the output of commands
        verbose: true
      })
    }
  })
}
```
