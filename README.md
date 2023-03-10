# dynamic-data-form-extension
Backstage Plugin - Dynamic Data Form Extension (Frontend and Backend Plugins)

The [dynamic-field-extension](./packages/dynamic-pick-extension/) is a [Custom Field Extension](https://backstage.io/docs/features/software-templates/writing-custom-field-extensions) that allow you to create `<Select>` components that fetches data dynamically from an endpoint. This can be used together with the `form-data-backend` plugin to write custom logic to fill the field.

The [form-data-backend](./packages/form-data-backend) is a [Backstage Backend Plugin](https://backstage.io/docs/plugins/backend-plugin) that allow you to write custom providers to add custom logic and build the data to be shown on the `dynamic-field-extension` for example for APIs that require authentication or to parse data that doesn't come on the required JSON Array String format.