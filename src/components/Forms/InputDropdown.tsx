import { RBRef } from 'adapter/types';
import React from 'react'
import { Form, Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { initInputDropdownState, InputDropdownProps } from './types'

function InputDropdown (props: InputDropdownProps = initInputDropdownState) {

  const { name, label, ds, isReadOnly, md, sm, skipValidate, validateFn } = props;

  const { register, errors } = useFormContext()

  return <>
    <Form.Group as={Col} md={md} sm={sm}>
      <Form.Label style={{ fontSize: 18 }} className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
      <Form.Control
        as="select"
        className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
        // onChange={(e: any) => updateFn(e, fnParam && fnParam)}
        // value={getValues(name)}
        defaultValue=""
        ref={register({ validate: validateFn }) as RBRef}
        name={name}
        disabled={isReadOnly}
      >
        {ds.map((item, idx) => {
          return <option key={idx} disabled={item.disabled} value={item.value}>{item.display}</option>
        })}
      </Form.Control>
      {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須選擇其中一項</label>}
    </Form.Group>
  </>
}

export default InputDropdown;