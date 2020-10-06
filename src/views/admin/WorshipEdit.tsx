import { useMutation, useQuery } from '@apollo/client';
import { setSysMessage, setLoading, setSystemFailure } from 'actions';
import { RBRef } from 'adapter/types';
import { ADD_WORSHIP, GET_WORSHIP, UPDATE_WORSHIP } from 'graphqls/graphql';
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { RootState } from 'reducers';
import Validators from 'utils/validator';

type WorshipEditProps = {
  worshipId: string
}

function WorshipEdit(props: WorshipEditProps) {

  const [isReadOnly, setIsReadOnly] = useState(true)

  const history = useHistory()

  const location = useLocation()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const [updateWorship, { data }] = useMutation(UPDATE_WORSHIP);
  const { loading, data: wData, refetch } = useQuery(GET_WORSHIP, { variables: { worshipId: props.worshipId }, notifyOnNetworkStatusChange: true })

  const { register, setValue, getValues, handleSubmit, reset, control, errors, trigger } = useForm({
    defaultValues: {
      ...formDef,
      docs: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docs"
  });

  const watchType = useWatch({
    control,
    name: 'type',
  })

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

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp = data
    let tmpDocs: any[] = []
    data.docs.forEach((e: any) => {
      tmpDocs.push({ ...e })
    });
    delete tmp.docs
    updateWorship({
      variables: {
        input: {
          ...tmp
        },
        docs: [...tmpDocs]
      }
    }).catch((err: any) => {
      console.log(err)
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      history.push('/admin/worships')
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('儲存成功!'))
      dispatch(setLoading(false))
      reset();
      history.push('/admin/worships')
    }
  }, [data])

  useEffect(() => {
    register('note')
    register('verse')
  }, [register])

  useEffect(() => {
    document.title = "管理控制台"
    dispatch(setLoading(true))
  }, [])

  useEffect(() => {
    if (wData !== undefined) {
      // Object.keys(wData.worship).forEach(e => {
      //   if (typeof wData.worship[e] === 'object') {
      //     setValue('docs', [...wData.worship[e]], { shouldValidate: true, shouldDirty: true })
      //   } else {
      //     setValue(e, wData.worship[e])
      //   }
      // })
      setTimeout(() => {
        reset(wData.worship)
      })    
    }
  }, [wData])

  useEffect(() => {
    if (wData != null) {
      dispatch(setLoading(true))
      refetch();
    }
  }, [location])

  useEffect(() => {
    if (loading === false) {
      dispatch(setLoading(false))
    }
  }, [loading])

  useEffect(() => {
    if (fields !== undefined) {
      fields.forEach((field, idx) => {
        let decloyField = { ...field }
        delete decloyField.id
        if (Object.values(decloyField).map(x => x.length).reduce((prev, curr) => prev + curr) > 0)
          setValue(`docs[${idx}]`, field)
      })
    }
  }, [fields])

  useEffect(() => {
    if (watchType !== undefined)
      trigger()
  }, [watchType])

  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const inputTextGenerator = (name: string, label: string,
    placeholder?: string, md?: number, sm?: number, skipValidate: boolean = false,
    strongReadOnly: boolean = false, validateFn: any = Validators.Default) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
        <Form.Control
          className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
          placeholder={placeholder}
          // onChange={(e: any) => updateFn(e, fnParam && fnParam)}
          // value={targetState?.[name]}
          ref={register({ validate: validateFn }) as RBRef}
          name={name}
          readOnly={strongReadOnly || isReadOnly}
        ></Form.Control>
        {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
      </Form.Group>
    </>
  }

  const dropdownGenerator = (name: string, label: string, ds: any[], md?: number, sm?: number,
    skipValidate: boolean = false, strongReadOnly: boolean = false, validateFn: any = Validators.Default) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
        <Form.Control
          as="select"
          className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
          // onChange={(e: any) => updateFn(e, fnParam && fnParam)}
          // value={getValues(name)}
          defaultValue=""
          ref={register({ validate: validateFn }) as RBRef}
          name={name}
          disabled={isReadOnly}
        >
          {ds.map((item, idx) => {
            return <option key={idx} disabled={item.disabled} value={item.value}>{item.display}</option>
          })}
        </Form.Control>
        {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須選擇其中一項</label>}
      </Form.Group>
    </>
  }

  const quillGenerator = (name: string, label: string) => {

//     const handleChange = (content: any) => {
//       setValue(name, content)
//     }

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

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={item.id}>
        {inputTextGenerator(`docs[${idx}].link`, `檔案${idx + 1}連結`, 'e.g. https://www.abc.com/', 6, 12, true)}
        {inputTextGenerator(`docs[${idx}].title`, '名稱', undefined, 3, 12, true)}
        {dropdownGenerator(`docs[${idx}].type`, '檔案類型', docTypes, 3, 12, true)}
        {!isReadOnly && <Form.Group as={Col} className="text-right" md={12}>
          <Button className="mx-1" onClick={() => addRow()} variant="info"><i className="fa fa-plus"></i></Button>
          <Button onClick={() => remove(idx)} variant="info"><i className="fa fa-trash"></i></Button>
        </Form.Group>}
      </Form.Row>
    })
  }

  return (
    <>
      {!loading && <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h2>
        {isReadOnly && <Button onClick={() => setIsReadOnly(false)} style={{ backgroundColor: '#dc1414' }}>
          <i className="fas fa-lock" style={{ fontSize: 28 }}></i>
        </Button>}
        {!isReadOnly && <Button
          onClick={() => setIsReadOnly(true)} style={{ backgroundColor: '#23a223' }}
        >
          <i className="fas fa-lock-open" style={{ fontSize: 28 }}></i>
        </Button>}
        <Form.Row>
          {inputTextGenerator('title', '講題', '請輸入講題', undefined, undefined, false, false, Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜"))}
          {inputTextGenerator('worshipId', '日期', 'YYYYMMDD', undefined, undefined, false, true)}
        </Form.Row>
        <Form.Row>
          {dropdownGenerator('type', '分類', dropdownData, undefined, undefined, false, false, Validators.Required)}
          {inputTextGenerator('messenger', '講員', '請輸入講員姓名', undefined, undefined, false, false, Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜"))}
        </Form.Row>
        <Form.Row>
          {inputTextGenerator('link', '影片連結', 'e.g. https://www.abc.com/')}
        </Form.Row>
        {rowGenerator()}
        <Form.Row className="mb-5">
          {quillGenerator('note', '講道筆記')}
        </Form.Row>
        <Form.Row className="mb-5">
          {quillGenerator('verse', '經文')}
        </Form.Row>
        {!isReadOnly && <Form.Row>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
            >儲存</Button>
          </Form.Group>
        </Form.Row>}
      </Form>}
    </>
  )
}

export default WorshipEdit;
