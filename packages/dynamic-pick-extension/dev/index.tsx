import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { dynamicPickExtensionPlugin, DynamicPickFieldExtension } from '../src/plugin';

createDevApp()
  .registerPlugin(dynamicPickExtensionPlugin)
  .addPage({
    element: <DynamicPickFieldExtension />,
  })
  .render();
