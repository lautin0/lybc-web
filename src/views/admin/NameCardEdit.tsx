import DropzoneCustom from "components/DropzoneCustom";
import InputText from "components/Forms/InputText";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import ImageUploader from 'react-images-upload'
import Validators from "utils/validator";

function NameCardEdit(props: any) {

  const methods = useForm({
    defaultValues: {
      bookName: '',
      author: ''
    }
  });

  const { handleSubmit, getValues, reset } = methods

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="category mt-5" style={{ color: 'black' }}>新來賓資料</h2>
        <Form.Row>
          {/* <InputText
            md={6}
            name="bookName"
            label="書名"
            placeholder="請輸入書名"
            validateFn={Validators.NoWhiteSpace}
          /> */}
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
            >儲存</Button>
            <Button
              className="mx-3"
              onClick={() => {
                reset()
              }}
            >
              重設
          </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </FormProvider>
  );
}

export default NameCardEdit;