import PropTypes from 'prop-types';
// form
import { useFormContext, useController, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

import React from 'react';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};



export default function RHFSelect({ name, children, defValue, ...other }) {
  const { control } = useFormContext();
  const [value, setValue] = React.useState(defValue);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }}) => (
        <TextField
          {...field}
          select
          fullWidth
          value={value}
          onChange={(evt)=>{
            field.onChange(evt.target.value);
            setValue(evt.target.value);
          }}
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
