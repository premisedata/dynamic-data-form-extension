import React from 'react';
import { InputLabel, FormControl, Select, MenuItem, LinearProgress, FormHelperText } from '@material-ui/core';
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '@backstage/plugin-scaffolder';
import { useAsync } from 'react-use';
import { useApi, configApiRef } from '@backstage/core-plugin-api'

const DynamicPickExtensionWithOptionsFieldSchema = makeFieldSchemaFromZod(
  z.string(),
  z.object({
    form_data: z
      .string()
      .describe('Endpoint from form-data plugin to fill the select'),
    external_data: z
      .string()
      .describe('External endpoint to fill the select. Needs to return a JSON array of strings.'),
  }),
);

export const DynamicPickExtensionWithOptionsSchema = DynamicPickExtensionWithOptionsFieldSchema.schema;

type DynamicPickExtensionWithOptionsProps = typeof DynamicPickExtensionWithOptionsFieldSchema.type;

export const DynamicPickExtension = ({
  onChange,
  rawErrors,
  required,
  formData,
  idSchema,
  schema: { title, description },
  uiSchema: { 'ui:options': options },
}: DynamicPickExtensionWithOptionsProps) => {
  const config = useApi(configApiRef);
  const backendUrl = config.getString('backend.baseUrl');
  let formDataOptions: any = []
  if (options?.external_data) {
    formDataOptions = useAsync(async () => {
      return (await fetch(options?.external_data)).json();
    })
  } else if (options?.form_data) {
    formDataOptions = useAsync(async () => {
      return (await fetch(`${backendUrl}/api/form-data/${options?.form_data}`)).json();
    })
  }
  
  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors?.length > 0 && !formData}
    >
      <InputLabel >{title}</InputLabel >
      <Select
        label={title}
        id={idSchema?.$id}
        value={formData ?? ""}
        onChange={({ target: { value } }) => onChange(value)}
        >
        {(()=> {
          try {
            return formDataOptions.value?.map((option: any) => <MenuItem key={option} value={option}>{option}</MenuItem>)
          } catch (error) {
            return <MenuItem value="Error">Error</MenuItem>
          }
        })()}
        {formDataOptions.loading && <LinearProgress />}
      </Select>
      {description && <FormHelperText>{description}</FormHelperText>}
    </FormControl >)
};
