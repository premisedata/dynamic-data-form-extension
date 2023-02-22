import { createPlugin } from '@backstage/core-plugin-api';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { DynamicPickExtension, DynamicPickExtensionWithOptionsSchema } from './components/DynamicPickExtension';

export const dynamicPickExtensionPlugin = createPlugin({
  id: 'dynamic-pick-extension',
});

export const DynamicPickFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
      name: 'DynamicPickExtension',
      component: DynamicPickExtension,
      schema: DynamicPickExtensionWithOptionsSchema,
  }),
);
