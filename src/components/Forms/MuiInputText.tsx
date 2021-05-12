import { createStyles, Grid, makeStyles, TextField, TextFieldProps } from '@material-ui/core';
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

type MuiInputTextProp = {
   name: string
   label?: string
   isReadOnly?: boolean
   lg? :any
   md?: any
   sm?: any
   xs?: any
   skipValidate?: boolean
   validateFn?: any
   strongReadOnly?: boolean
}

type MergedTextFieldProp = MuiInputTextProp & TextFieldProps

function MuiInputText(props: MergedTextFieldProp) {

   const { errors, control } = useFormContext()

   const classes = useStyles()

   return <Grid
      item
      lg={props.lg}
      md={props.md}
      sm={props.sm}
      xs={props.xs}
      className={classes.item}
   >
      <Controller
         name={props.name}
         control={control}
         defaultValue=""
         rules={{ validate: props.validateFn }}
         render={({ onChange, onBlur, value }) => {
            return <TextField
               error={!props.skipValidate && !!errors[props.name]}
               // id="standard-error-helper-text"  
               size={props.size} // "small" | "medium"
               placeholder={props.placeholder}
               type={props.type || 'text'}
               fullWidth={true}
               label={props.label}
               multiline={props.multiline}
               rows={props.rows}
               variant="outlined"
               onChange={onChange}
               onBlur={onBlur}
               value={value || ''}
               InputProps={props.InputProps}
               disabled={props.strongReadOnly || props.isReadOnly}
               helperText={(!props.skipValidate && errors[props.name]) && <label style={{ opacity: .6, color: '#FF3636' }}>{errors[props.name].message != "" ? errors[props.name].message : "必須輸入這欄"}</label>}
            />
         }}
      />
   </Grid>
}

export default MuiInputText;