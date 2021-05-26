import DropzoneCustom from 'components/DropzoneCustom';
import InputText from 'components/Forms/InputText'
import InputTextArea from 'components/Forms/InputTextArea';
import { PostStatus } from 'generated/graphql';
import React from 'react'
import { DropzoneState } from 'react-dropzone';

type SharingFormPropsType = {
  status?: PostStatus,
  readOnly: boolean
  dropzoneMethods: DropzoneState
}

function SharingForm(props: SharingFormPropsType) {

  const { dropzoneMethods, readOnly, status } = props

  return <>
    <InputText
      name="title"
      label="標題"
      md={7}
      sm={12}
      isReadOnly={readOnly}
    />
    <InputText
      name="subtitle"
      label="副標題"
      isReadOnly={readOnly}
    />
    {readOnly && <InputTextArea
      name="remarks"
      label="備註"
      isReadOnly={readOnly}
    />}
    {(!status || status === PostStatus.Withhold) && <><label className="mt-5">選擇文章檔案 (接受格式: docx, pdf)</label>
      <DropzoneCustom lg={12} xl={6} {...dropzoneMethods} />
    </>}
  </>
}

export default SharingForm