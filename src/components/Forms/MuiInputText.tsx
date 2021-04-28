import { Box, TextField } from '@material-ui/core';
import { RBRef } from 'adapter/types';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

function MuiInputText(props: any) {

   const { name, label, isReadOnly, md, sm, skipValidate, placeholder, validateFn, strongReadOnly, width } = props;

   const { errors, control } = useFormContext()

   return <Box
      width={width}
   >
      <Controller
         name={name}
         control={control}
         rules={{ validate: validateFn }}
         render={({ onChange, onBlur, value }) => {
            return <TextField
               error={!skipValidate && !!errors[name]}
               // id="standard-error-helper-text"  
               placeholder={placeholder}
               fullWidth={true}    
               label={label}
               variant="outlined"
               onChange={onChange}
               onBlur={onBlur}
               defaultValue={value}
               disabled={strongReadOnly || isReadOnly}
               helperText={(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
            />
         }}
      />
   </Box>
}

export default MuiInputText;