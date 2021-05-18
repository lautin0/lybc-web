import { trim } from "lodash"

const Validators = {
  Required: (value: any) => {
    return value != null
  },
  RequireForValue: (targetValue: any, toBe: any) => {
    return targetValue === toBe ? (value: any) => {
      return value != null
    } : Validators.Default
  },
  NoWhiteSpace: (value: any) => {
    return value != null && trim(value).length > 0
  },
  NoWhiteSpaceForValue: (targetValue: any, toBe: any) => {
    return targetValue === toBe ? (value: any) => {
      return value != null && trim(value).length > 0
    } : Validators.Default
  },
  NoWhiteSpaceForWhiteSpace: (targetValue: any) => {
    return (!targetValue || trim(targetValue).length === 0) ? (value: any) => {
      return value != null && trim(value).length > 0
    } : Validators.Default
  },
  Default: (value: any) => {
    return true
  }
}

export default Validators
