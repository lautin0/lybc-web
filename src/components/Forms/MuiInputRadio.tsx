import { FormHelperText, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type MuiInputRadioProps = {
   name: string,
   itemList: Array<{ value: any, control: React.ReactElement, label: string }>,
   label?: string,
   required?: boolean,
   disabled?: boolean,
}

export default function MuiInputRadio(props: MuiInputRadioProps) {

   const { name, itemList, label, required, disabled } = props

   const { formState: { errors }, control } = useFormContext()

   return <FormControl component="fieldset" error={errors[name] != null}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      {errors[name] != null && <FormHelperText>{errors?.[name]?.message === "" ? "請選擇" : errors?.[name]?.message}</FormHelperText>}
      <Controller
         render={({ field, fieldState }) =>
            <RadioGroup aria-label={name} row {...field}>
               {itemList.map((x, i) => (
                  <FormControlLabel
                     key={x.value}
                     disabled={disabled}
                     {...x}
                  />
               ))}
            </RadioGroup>
         }
         name={name}
         control={control}
         rules={{ required: required }}
      />
   </FormControl>
}