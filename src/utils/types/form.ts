import { HTMLInputTypeAttribute } from "react";

export interface FormDataType {
  inputs: Array<FormInputData>;
  initialData?: Object;
}

export interface FormInputData {
  name: string;
  label: string;
  inputType: string;
  options?: Array<any>;
  rules: Array<string>;
  field?: string;
  isDisabled?: boolean;
  rows?: number;
  type?: HTMLInputTypeAttribute;
  accept?: string;
  required?: boolean;
  ariaLabel?: string;
}
