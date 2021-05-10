import { InputLabel, Select, MenuItem, FormControl, FormHelperText, Grid, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const useStyles = makeStyles((theme) =>
  createStyles({
    item: {
      paddingRight: theme.spacing(3),
      // textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
  }),
);

type MuiInputDropdownProp = {
  name: string
  label?: string
  isReadOnly?: boolean
  ds: Array<any>
  lg?: any
  md?: any
  sm?: any
  xs?: any
  rows?: number
  multiline?: boolean
  skipValidate?: boolean
  validateFn?: any
  strongReadOnly?: boolean
  size?: "small" | "medium"
  type?: string
}

export default function MuiInputDropdown(props: MuiInputDropdownProp) {

  const { name, label, isReadOnly, ds, lg, md, sm, xs, skipValidate, validateFn, strongReadOnly } = props;

  const { errors, control } = useFormContext()

  const classes = useStyles()

  return <Grid
    item
    lg={lg}
    md={md}
    xs={xs}
    sm={sm}
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