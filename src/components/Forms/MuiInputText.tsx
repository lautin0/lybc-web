import { createStyles, Grid, makeStyles, TextField } from '@material-ui/core';
import { RBRef } from 'adapter/types';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) =>
   createStyles({
      item: {
         paddingRight: theme.spacing(3),
         textAlign: 'center',
         color: theme.palette.text.secondary,
         whiteSpace: 'nowrap',
         marginBottom: theme.spacing(1),
      },
   }),
);

function MuiInputText(props: any) {

   const { name, label, isReadOnly, md, sm, xs, rows, multiline, skipValidate, placeholder, validateFn, strongReadOnly } = props;

   const { errors, control } = useFormContext()

   const classes = useStyles()

   return <Grid
      item
      md={md}
      sm={sm}
      xs={xs}
      className={classes.item}
   >
      <Controller
         name={name}
         control={control}
         defaultValue=""
         rules={{ validate: validateFn }}
         render={({ onChange, onBlur, value }) => {
            return <TextField
               error={!skipValidate && !!errors[name]}
               // id="standard-error-helper-text"  
               placeholder={placeholder}
               fullWidth={true}
               label={label}
               multiline={multiline}
               rows={rows}
               variant="outlined"
               onChange={onChange}
               onBlur={onBlur}
               value={value || ''}
               disabled={strongReadOnly || isReadOnly}
               helperText={(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
            />
         }}
      />
   </Grid>
}

export default MuiInputText;