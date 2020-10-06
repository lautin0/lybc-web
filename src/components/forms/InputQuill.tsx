import React from 'react'
import { useMemo } from 'react'
import { Form } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'
import ReactQuill from 'react-quill'

function InputQuill({ name, label, isReadOnly }: any) {

  const { control } = useFormContext()

  const editorModules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6] }],
      [{ 'font': [] }],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
  }), []);

  return <>
    <Form.Label>{label}</Form.Label>
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) =>
        <ReactQuill
          className="mb-3"
          value={value || ''}
          onChange={(content: any) => onChange(content)}
          modules={editorModules}
          style={{
            width: '100%',
            minHeight: 400,
          }}
          readOnly={isReadOnly}
        />
      }
    />
  </>
}

export default InputQuill