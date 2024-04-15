# form-data

Welcome to the form-data backend plugin! This plugin is a [Backstage Backend Plugin](https://backstage.io/docs/plugins/backend-plugin) that allow you to write custom providers to add custom logic and build the data to be shown on the `dynamic-field-extension` for example for APIs that require authentication or to parse data that doesn't come on the required JSON Array String format.

## Installation
Read on how to install packages from GitHub Packages https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package

```
cd packages/backend/
yarn add @premise/plugin-form-data-backend
```

## Configuration
Create a `form-data.ts` file under `packages/backend/src/plugins` with the following content:
```ts
import { createRouter } from '@premise/plugin-form-data-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { exampleRouter } from '../providers';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter(
    {
      logger: env.logger,
      config: env.config,
    },
    [
      {
        path: '/example',
        router: exampleRouter,
      }
    ],
  );
}
```

Create a `providers` folder under `packages/backend/src` containing all of your custom providers:
`packages/backend/src/providers/index.ts`
```ts
# Add here other custom providers
export * from './example.ts';
```

`packages/backend/src/providers/example.ts`
```ts
import express from 'express';
import Router from 'express-promise-router';
import { RouterOptions } from '@premise/plugin-form-data-backend';

export async function exampleRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  
  // You can add in here all of the endpoints you want   
  router.get('/ping', async (_, response) => {
    logger.info('Pong');
    response.json(['pong']);
  });
  
  return router;
}
```

Then under `packages/backend/src/index.ts` import the plugin:
```ts
import formData from './plugins/form-data';
// ...
const formDataEnv = useHotMemoize(module, () => createEnv('form-data'));
// ...
apiRouter.use('/form-data', await formData(formDataEnv));
```

## Usage with dynamic-pick-extension
```yaml
parameters:
    - example:
        title: Example
        type: string
        ui:field: DynamicPickExtension
        ui:options:
            # This is a provider added on the form-data-backend plugin
            form_data: example/ping
```

## Contributing
You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.
