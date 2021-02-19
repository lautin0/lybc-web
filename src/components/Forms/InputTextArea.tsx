import { RBRef } from "adapter/types";
import React from 'react'
import { Form, Col } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { initInputTextState, InputTextProps } from "./types";

function InputTextArea(props: InputTextProps = initInputTextState) {

  const { name, label, isReadOnly, md, sm, skipValidate, placeholder, validateFn, strongReadOnly } = props;

  const { register, errors } = useFormContext()

  return <Form.Group as={Col} md={md} sm={sm}>
    <Form.Label style={{ fontSize: 18 }} className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
    <Form.Control
      className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
      style={{
        borderLeft: '.5px lightgrey solid',
        borderRight: '.5px lightgrey solid',
        borderTop: '.5px lightgrey solid',
        borderRadius: '.5rem',
        minHeight: 150,
        fontSize: 18,
        padding: 10
      }}
      placeholder={placeholder}
      ref={register({ validate: validateFn }) as RBRef}
      name={name}
      as="textarea"
      rows={4}
      readOnly={strongReadOnly || isReadOnly}
    ></Form.Control>
    {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
  </Form.Group>
}

export default InputTextArea;