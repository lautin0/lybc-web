import React, { useMemo } from "react";
import { Col } from "react-bootstrap";
import { DropzoneState } from "react-dropzone";

function DropzoneCustom(props: DropzoneState) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = props

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const baseStyle = useMemo(() => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'gray',
    fontWeight: 'bolder',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  } as React.CSSProperties), []);

  const activeStyle = useMemo(() => ({
    borderColor: '#2196f3'
  }), []);

  const acceptStyle = useMemo(() => ({
    borderColor: '#00e676'
  }), []);

  const rejectStyle = useMemo(() => ({
    borderColor: '#ff1744'
  }), []);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
    activeStyle,
    acceptStyle,
    rejectStyle,
    baseStyle
  ]);

  return <Col xl={6} lg={12}>
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>把檔案拖曳到此處，或點擊開始選擇</p>
      <i className="fas fa-upload" style={{ fontSize: 42, color: 'lightgray' }}></i>
    </div>
    <aside>
      {(files.length > 0) && <h4>Files</h4>}
      <ul>{files}</ul>
    </aside>
  </Col>
}

export default DropzoneCustom;