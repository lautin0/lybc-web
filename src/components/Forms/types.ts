import Validators from "utils/validator"

export type InputTextProps = {

  name: string,
  
  label: string,
  
  isReadOnly?: boolean,
  
  placeholder?: string,
  
  md?: number | { span: number, offset?: number },
  
  sm?: number | { span: number, offset?: number },
  
  skipValidate?: boolean,

  strongReadOnly?: boolean,

  validateFn?: any

}

export type InputDropdownProps = {

  name: string,
  
  label: string,

  ds: any[]
  
  isReadOnly?: boolean,
    
  md?: number | { span: number, offset?: number },
  
  sm?: number | { span: number, offset?: number },
  
  skipValidate?: boolean,

  strongReadOnly?: boolean,

  validateFn?: any

}

export const initInputTextState: InputTextProps = {

  name: '',
  
  label: '',
  
  isReadOnly: false,
  
  placeholder: '',
  
  skipValidate: false,

  strongReadOnly: false,

  validateFn: Validators.Default

}

export const initInputDropdownState = {

  name: '', 

  label: '', 

  ds: [], 

  isReadOnly: false,

  skipValidate: false, 

  strongReadOnly: false, 

  validateFn: Validators.Default

}