import DateFnsUtils from "@date-io/date-fns";
import { IconButtonProps, PropTypes } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { WrapperVariant } from "@material-ui/pickers/wrappers/Wrapper";
import { FC, ReactElement } from "react"
import { useController } from "react-hook-form";

type MuiDatePickerProps = {
   control: any
   name: string
   "data-testid"?: string
   variant?: WrapperVariant
   margin?: PropTypes.Margin
   label?: string
   format?: string
   KeyboardButtonProps?: Partial<IconButtonProps<"button", {}>>
}

const MuiDatePicker: FC<MuiDatePickerProps> = (props): ReactElement => {
   const { control, name } = props
   const { field: { ref, ...inputProps } } = useController({
      name,
      control
   });

   return <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
         {...inputProps}
         inputRef={ref}
         data-testid={props["data-testid"]}
         variant={props.variant}
         margin={props.margin}
         label={props.label}
         format={props.format}
         KeyboardButtonProps={props.KeyboardButtonProps}
      />
   </MuiPickersUtilsProvider>
}

export default MuiDatePicker;