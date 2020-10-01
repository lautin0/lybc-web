import { useMutation } from '@apollo/client';
import { AdminWorshipForm, AdminWorshipFormDoc, setSysMessage, setLoading, setSystemFailure } from 'actions';
import { ADD_WORSHIP } from 'graphqls/graphql';
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'reducers';

function WorshipCreate() {

  const history = useHistory()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const [addWorship, { data, loading: addWorshipLoading, error: addWorshipError }] = useMutation(ADD_WORSHIP);

  const [form, setForm] = useState<AdminWorshipForm>(formDef);
  const [docs, setDocs] = useState<AdminWorshipFormDoc[]>(formDef.docs);

  const dispatch = useDispatch();

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

  const dropdownData = [
    { value: '', display: '請選擇', disabled: true },
    { value: '主日崇拜', display: '主日崇拜' },
    { value: '分享主日', display: '分享主日' },
  ]

  const docTypes = [
    { value: '', display: '請選擇', disabled: true },
    { value: 'docx', display: 'docx' },
    { value: 'pdf', display: 'pdf' },
  ]

  const handleInputChange = (e: any) => setForm({
    ...form,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleDocsInputChange = (e: any, idx: any) => {
    let decloy = docs
    let doc = decloy[idx]
    doc = { ...doc, [e.currentTarget.name]: e.currentTarget.value }
    decloy[idx] = doc;
    setDocs([...decloy])
  }

  useEffect(() => {
    setForm({
      ...form,
      docs: docs
    })
  }, [docs])

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('儲存成功!'))
      dispatch(setLoading(false))
      setForm(formDef)
      setDocs([{ title: '', link: '', type: '' }])
      history.push('/admin/worships')
    }
  }, [data])

  useEffect(() => {
    document.title = "管理控制台"
  }, [])

  const addRow = () => {
    setDocs([
      ...docs,
      { title: '', link: '', type: '' }
    ])
  }

  // const createWorshipsFromDataJson = () => {
  //   worshipData.forEach(e => {
  //     let tmp = e
  //     let tmpDocs = e.docs
  //     delete tmp.docs
  //     addWorship({
  //       variables: {
  //         input: {
  //           ...tmp
  //         },
  //         docs: [...tmpDocs]
  //       }
  //     })
  //   })
  // }

  const formGroupInputTextGenerator = (name: string, label: string, targetState: any, updateFn: Function, fnParam: any, placeholder?: string, md?: number, sm?: number) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          className="form-control admin"
          placeholder={placeholder}
          onChange={(e: any) => updateFn(e, fnParam !== undefined ? fnParam : targetState)}
          value={targetState?.[name]}
          name={name}
        ></Form.Control>
      </Form.Group>
    </>
  }

  const formGroupDropdownGenerator = (name: string, label: string, ds: any[], targetState: any, updateFn: Function, fnParam: any, md?: number, sm?: number) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          className="form-control admin"
          onChange={(e: any) => updateFn(e, fnParam !== undefined ? fnParam : targetState)}
          value={targetState?.[name]}
          name={name}
        >
          {ds.map((item, idx) => {
            return <option key={idx} disabled={item.disabled} value={item.value}>{item.display}</option>
          })}
        </Form.Control>
      </Form.Group>
    </>
  }

  const formGroupQuillGenerator = (name: keyof AdminWorshipForm, label: string) => {

    const handleChange = (content: any) => {
      setForm({
        ...form,
        [name]: content
      })
    }

    return <>
      <Form.Label>{label}</Form.Label>
      <ReactQuill
        className="mb-3"
        value={(form[name] as string)}
        onChange={handleChange}
        modules={editorModules}
        style={{
          width: '100%',
          minHeight: 400,
          // maxWidth: '98vw'
        }}
      />
    </>
  }

  const formRowGenerator = () => {
    return docs.map((item: any, idx: number) => {
      return <Form.Row key={idx}>
        {formGroupInputTextGenerator('link', `檔案${idx + 1}連結`, item, handleDocsInputChange, idx, 'e.g. https://www.abc.com/', 6, 12)}
        {formGroupInputTextGenerator('title', '名稱', item, handleDocsInputChange, idx, undefined, 3, 12)}
        {formGroupDropdownGenerator('type', '檔案類型', docTypes, item, handleDocsInputChange, idx, 3, 12)}
        <Form.Group as={Col} className="text-right" md={12}>
          <Button onClick={() => addRow()} variant="primary">+</Button>
        </Form.Group>
      </Form.Row>
    })
  }

  return (
    <>
      <h2 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h2>
      <Form.Row>
        {formGroupInputTextGenerator('title', '講題', form, handleInputChange, undefined, '請輸入講題')}
        {formGroupInputTextGenerator('worshipId', '日期', form, handleInputChange, undefined, 'YYYYMMDD')}
      </Form.Row>
      <Form.Row>
        {formGroupDropdownGenerator('type', '分類', dropdownData, form, handleInputChange, undefined)}
        {formGroupInputTextGenerator('messenger', '講員', form, handleInputChange, undefined, '請輸入講員姓名')}
      </Form.Row>
      <Form.Row>
        {formGroupInputTextGenerator('link', '影片連結', form, handleInputChange, undefined, 'e.g. https://www.abc.com/')}
      </Form.Row>
      {formRowGenerator()}
      <Form.Row className="mb-5">
        {formGroupQuillGenerator('note', '講道筆記')}
      </Form.Row>
      <Form.Row className="mb-5">
        {formGroupQuillGenerator('verse', '經文')}
      </Form.Row>
      {/* <Form.Row>
            <Form.Group as={Col}>
              <Form.Check
                id="cb1"
                type="checkbox"
                label={<><span className="form-check-sign"></span>Checkbox Example</>}
              ></Form.Check>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Row>
                <Form.Check
                  className="form-check-radio mx-2"
                  id="rb1"
                  name="rb"
                  type="radio"
                  label={<><span className="form-check-sign"></span>Radio Example 1</>}
                ></Form.Check>
                <Form.Check
                  className="form-check-radio mx-2"
                  id="rb2"
                  name="rb"
                  type="radio"
                  label={<><span className="form-check-sign"></span>Radio Example 2</>}
                ></Form.Check>
              </Form.Row>
            </Form.Group>
          </Form.Row> */}
      <Form.Row>
        <Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(setLoading(true))
              let tmp = form
              let tmpDocs = form.docs
              delete tmp.docs
              addWorship({
                variables: {
                  input: {
                    ...tmp
                  },
                  docs: [...tmpDocs]
                }
              }).catch(err => {
                console.log(err)
                dispatch(setLoading(false))
                dispatch(setSystemFailure(err))
                setForm(formDef)
              })
            }}
          // onClick={() => createWorshipsFromDataJson()}
          >儲存</Button>
          <Button
            className="mx-3"
            onClick={() => {
              setForm(formDef)
              setDocs([{ title: '', link: '', type: '' }])
            }}
          >
            重設
          </Button>
        </Form.Group>
      </Form.Row>
    </>
  )
}

export default WorshipCreate;