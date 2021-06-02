import { Grid, Typography } from '@material-ui/core'
import TinyEditorComponent from 'components/TinyMCE/TinyEditorComponent'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export default function InputTinyMCE({ name, label, isReadOnly }: any) {

   const { control } = useFormContext()

   return <Grid style={{ marginTop: 40, width: '100%' }}>
      <Typography style={{ fontSize: 18 }}>{label}</Typography>
      <Controller
         control={control}
         name={name}
         render={({ field: { ref, ...rest }, fieldState }) =>
            <TinyEditorComponent
               {...rest}               
               disabled={isReadOnly}
            />
         }
      />
   </Grid>
}