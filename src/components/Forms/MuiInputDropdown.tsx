import { InputLabel, Select, MenuItem, FormControl, FormHelperText, Grid, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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

export default function MuiInputDropdown(props: any) {

  const { name, label, isReadOnly, ds, md, sm, xs, skipValidate, placeholder, validateFn, strongReadOnly } = props;

  const { errors, control } = useFormContext()

  const classes = useStyles()

  return <Grid
    item
    md={md}
    xs={xs}
    className={classes.item}
  >
    <Controller
      name={name}
      control={control}
      rules={{ validate: validateFn }}
      defaultValue=""
      render={({ onChange, onBlur, value }) => {
        return <FormControl
          variant="filled"
          fullWidth={true}
          error={!skipValidate && !!errors[name]}
          disabled={strongReadOnly || isReadOnly}
        >
          <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            onChange={onChange}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {ds.map((item: any, idx: number) => {
              return <MenuItem key={idx} disabled={item.disabled} value={item.value}>{item.display}</MenuItem>
            })}
          </Select>
          {(!skipValidate && errors[name]) && <FormHelperText>必須輸入這欄</FormHelperText>}
        </FormControl>
      }}
    />
  </Grid>
}