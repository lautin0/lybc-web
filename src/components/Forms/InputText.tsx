import React from 'react'
import { Form, Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { initInputTextState, InputTextProps } from "./types";

function InputText(props: InputTextProps = initInputTextState) {

  const { name, label, isReadOnly, md, sm, skipValidate, placeholder, validateFn, strongReadOnly } = props;

  const { register, formState: { errors } } = useFormContext()

  return <>
    <Form.Group as={Col} md={md} sm={sm}>
      <Form.Label style={{ fontSize: 18 }} className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
      <Form.Control
        {...register(name, { validate: validateFn })}
        className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
        placeholder={placeholder}
        readOnly={strongReadOnly || isReadOnly}
      ></Form.Control>
      {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
    </Form.Group>
  </>
}

export default InputText;