import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '@backstage/plugin-scaffolder';
import { useAsync } from 'react-use';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  const [loading, setLoading] = useState(true);
  const [formDataOptions, setFormDataOptions] = useState([]);

  useAsync(async () => {
    if (options?.external_data) {
      setFormDataOptions(await (await fetch(options?.external_data)).json());
      setLoading(false);
    } else if (options?.form_data) {
      setFormDataOptions(await (await fetch(`${backendUrl}/api/form-data/${options?.form_data}`)).json());
      setLoading(false);
    }
  });

  return (
    <Autocomplete
      id={idSchema?.$id}
      loading={loading}
      value={formData ?? null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          variant="standard"
          required={required}
          error={rawErrors?.length > 0 && !formData}
          helperText={description}
        />
      )}
      options={formDataOptions}
      onChange={(_, value) => onChange(value)}
      getOptionSelected={(option, value) => option === value}
      disableClearable
    />
  )
};
