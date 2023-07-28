# dynamic-pick-extension

Welcome to the dynamic-pick-extension plugin! This plugin is a [Custom Field Extension](https://backstage.io/docs/features/software-templates/writing-custom-field-extensions) that allow you to create `<Select>` components that fetches data dynamically from an endpoint. This can be used together with the `form-data-backend` plugin to write custom logic to fill the field.

## Installation

```
cd packages/app/
yarn add @premise/plugin-dynamic-pick-extension
```

## Configuration
Add the import to your `App.tsx` on the frontend package of your backstage instance:

```js
import { DynamicPickFieldExtension } from '@premise/plugin-dynamic-pick-extension';
```

Then add the imported field extension as a child of `ScaffolderFieldExtensions`

```js
<ScaffolderFieldExtensions>
  <DynamicPickFieldExtension />
</ScaffolderFieldExtensions>
```

## Usage
To use the extension on a [Backstage Template Action](https://backstage.io/docs/features/software-templates/writing-templates) just add the `ui-field` and `ui-options` fields to the parameter

### Basic usage:
```yaml
parameters:
    - category:
        title: Category
        type: string
        ui:field: DynamicPickExtension
        ui:options:
            # IMPORTANT: The endpoint needs to return a JSON array of strings.
            external_data: https://dummyjson.com/products/categories
```

### Using the `form-data-backend` plugin:

```yaml
parameters:
    - team:
        title: Github Team to add as admin of the repository
        type: string
        ui:field: DynamicPickExtension
        ui:options:
            # This is a provider added on the form-data-backend plugin
            form_data: github/teams
```
