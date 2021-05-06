import { createStyles, Grid, makeStyles, TextField } from '@material-ui/core';
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
   rows?: number
   multiline?: boolean
   skipValidate?: boolean
   placeholder?: string
   validateFn?: any
   strongReadOnly?: boolean
   size?: "small" | "medium"
   type?: string
}

function MuiInputText(props: MuiInputTextProp) {

   const { name, label, isReadOnly, md, sm, xs, lg, rows, multiline, skipValidate, placeholder, validateFn, strongReadOnly, size, type } = props;

   const { errors, control } = useFormContext()

   const classes = useStyles()

   return <Grid
      item
      lg={lg}
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
               size={size} // "small" | "medium"
               placeholder={placeholder}
               type={type || 'text'}
               fullWidth={true}
               label={label}
               multiline={multiline}
               rows={rows}
               variant="outlined"
               onChange={onChange}
               onBlur={onBlur}
               value={value || ''}
               disabled={strongReadOnly || isReadOnly}
               helperText={(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>{errors[name].message != "" ? errors[name].message : "必須輸入這欄"}</label>}
            />
         }}
      />
   </Grid>
}

export default MuiInputText;