import DropzoneCustom from "components/DropzoneCustom";
import InputText from "components/Forms/InputText";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import ImageUploader from 'react-images-upload'
import Validators from "utils/validator";

function BooksCreate(props: any) {

  const methods = useForm({
    defaultValues: {
      bookName: '',
      author: ''
    }
  });

  const { handleSubmit, getValues, reset } = methods

  const [pictures, setPictures] = useState<Array<any>>([]);

  const onSubmit = (data: any) => {
    pictures && console.log(pictures[pictures.length - 1])
  }

  const onDrop = (picture: any) => {
    setPictures([...pictures, picture]);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="category mt-5" style={{ color: 'black' }}>書藉資料</h2>
        <Form.Row>
          <InputText
            md={6}
            name="bookName"
            label="書名"
            placeholder="請輸入書名"
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            md={6}
            name="author"
            label="作者"
            placeholder="請輸入作者"
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            md={6}
            name="isbn"
            label="ISBN"
            placeholder="請輸入國際索書號ISBN"
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            md={6}
            name="location"
            label="館藏點"
            placeholder="請輸入館藏點"
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <label>上載書藉封面</label>
          <ImageUploader
            style={{ maxWidth: 500 }}
            {...props}
            withIcon={true}
            withPreview={true}
            singleImage={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </Form.Row>
        {/* <DropzoneCustom /> */}
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

export default BooksCreate;