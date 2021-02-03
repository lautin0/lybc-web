import DropzoneCustom from 'components/DropzoneCustom';
import InputText from 'components/Forms/InputText'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form'

function SharingForm() {

  const dropzoneMethods = useDropzone({
    accept: '.docx,.pdf'
  });

  const { acceptedFiles } = dropzoneMethods

  const methods = useForm({
    defaultValues: {}
  })

  const { register, setValue, getValues, handleSubmit, reset, control, trigger } = methods

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <>
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          name="title"
          label="標題"
          md={7}
          sm={12}
        />
        <InputText
          name="subtitle"
          label="副標題"
          md={7}
          sm={12}
        />
        <label className="mt-5">選擇文章檔案 (接受格式: docx, pdf)</label>
        <DropzoneCustom {...dropzoneMethods} />
      </Form>
    </FormProvider>
  </>
}

export default SharingForm