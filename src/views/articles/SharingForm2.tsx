import DropzoneCustom from 'components/DropzoneCustom';
import MuiInputText from 'components/Forms/MuiInputText';
import { PostStatus } from 'generated/graphql';
import { DropzoneState } from 'react-dropzone';

type SharingFormPropsType = {
  status?: PostStatus,
  readOnly: boolean
  dropzoneMethods: DropzoneState
}

function SharingForm2(props: SharingFormPropsType) {

  const { dropzoneMethods, readOnly, status } = props

  return <>
    <MuiInputText
      name="title"
      label="標題"
      md={7}
      xs={12}
      isReadOnly={readOnly}
    />
    <MuiInputText
      name="subtitle"
      label="副標題"
      isReadOnly={readOnly}
    />
    {readOnly && <MuiInputText
      rows={4}
      multiline={true}
      name="remarks"
      label="備註"
      isReadOnly={readOnly}
    />}
    {(!status || status === PostStatus.Withhold) && <><label className="mt-5">選擇文章檔案 (接受格式: docx, pdf)</label>
      <DropzoneCustom {...dropzoneMethods} />
    </>}
  </>
}

export default SharingForm2