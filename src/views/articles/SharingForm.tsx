import DropzoneCustom from 'components/DropzoneCustom';
import InputText from 'components/Forms/InputText'
import React from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone';

type SharingFormPropsType = {
  dropzoneMethods: DropzoneState
}

function SharingForm(props: SharingFormPropsType) {

  const { dropzoneMethods } = props

  return <>
    <InputText
      name="title"
      label="標題"
      md={7}
      sm={12}
    />
    <InputText
      name="subtitle"
      label="副標題"
    />
    <label className="mt-5">選擇文章檔案 (接受格式: docx, pdf)</label>
    <DropzoneCustom {...dropzoneMethods} />
  </>
}

export default SharingForm