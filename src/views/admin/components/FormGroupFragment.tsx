import React from 'react'
import { Form, Col } from 'react-bootstrap'
import PropTypes, { string } from 'prop-types';

type FormGroupFragmentType = {

  // Item list
  list: any[]

  // Parent form
  form: any;

}

function FormGroupFragment(props: FormGroupFragmentType) {

  const handleInputChange = (e: any) => {
    props.list[e.currentTarget.id][e.currentTarget.name] = e.currentTarget.value
  }

  return (
    <>
      <Form.Row>
        {props.list.map((item, index) => {
          <Form.Group as={Col} key={index} md={item.md}>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control
              className="form-control admin"
              placeholder={item.placeholder}
              onChange={handleInputChange}
              value={props.form[item.value]}
              name={item.name}
            ></Form.Control>
          </Form.Group>
        })}

        {/* <Form.Group as={Col} md={3}>
          <Form.Label>名稱</Form.Label>
          <Form.Control className="form-control admin"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>符號</Form.Label>
          <Form.Control className="form-control admin" placeholder="e.g.: fa fa-user"></Form.Control>
        </Form.Group> */}

      </Form.Row>
    </>
  )
}

FormGroupFragment.propTypes = {
  form: PropTypes.arrayOf(string).isRequired,
}

export default FormGroupFragment