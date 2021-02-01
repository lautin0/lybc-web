import { useMutation, useQuery } from '@apollo/client';
import { setSysMessage, setLoading, setSystemFailure } from 'actions';
import InputDropdown from 'components/Forms/InputDropdown';
import InputQuill from 'components/Forms/InputQuill';
import InputText from 'components/Forms/InputText';
import { NewWorship, NewWorshipDoc, Worship } from 'generated/graphql';
import { GET_WORSHIP, UPDATE_WORSHIP } from 'graphqls/graphql';
import React, { useEffect, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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

  const [updateWorship, { data }] = useMutation<
    { updateWorship: any },
    { input: NewWorship, docs: NewWorshipDoc[] }
  >(UPDATE_WORSHIP);
  const { loading, data: wData, refetch } = useQuery<{ worship: Worship },{ worshipId: string }>(GET_WORSHIP, { variables: { worshipId: props.worshipId }, notifyOnNetworkStatusChange: true })

  const methods = useForm({
    defaultValues: {
      ...formDef,
      link: '',
      note: '',
      verse: '',
      docs: [ ...formDef.docs ] as object
    }
  })

  const { register, setValue, getValues, handleSubmit, reset, control, trigger } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docs"
  });

  const watchType = useWatch({
    control,
    name: 'type',
  })

  const dispatch = useDispatch();

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
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      history.push('/admin/worships')
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      reset();
      history.push('/admin/worships')
    }
  }, [data, history, dispatch, reset])

  useEffect(() => {
    register('note')
    register('verse')
  }, [register])

  useEffect(() => {
    document.title = "管理控制台"
    dispatch(setLoading(true))
  }, [dispatch])

  useEffect(() => {
    if (wData !== undefined) {
      setTimeout(() => {
        reset({ 
          ...wData.worship,
          note: wData.worship.note!,
          link: wData.worship.link!,
          verse: wData.worship.verse!,
        })
      })
    }
  }, [wData, reset])

  useEffect(() => {
    if (wData != null) {
      dispatch(setLoading(true))
      refetch();
    }
  }, [location, dispatch, refetch])

  useEffect(() => {
    if (loading === false) {
      dispatch(setLoading(false))
    }
  }, [loading, dispatch])

  useEffect(() => {
    if (fields !== undefined) {
      fields.forEach((field, idx) => {
        let decloyField = { ...field }
        delete decloyField.id
        if (Object.values(decloyField).map(x => x.length).reduce((prev, curr) => prev + curr) > 0)
          setValue(`docs[${idx}]`, field)
      })
    }
  }, [fields, setValue])

  useEffect(() => {
    if (watchType !== undefined)
      trigger()
  }, [watchType, trigger])

  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={item.id}>
        <InputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          isReadOnly={isReadOnly}
          placeholder="e.g. https://www.abc.com/"
          md={6}
          sm={12}
          skipValidate={true}
        />
        <InputText
          name={`docs[${idx}].title`}
          label="名稱"
          isReadOnly={isReadOnly}
          md={3}
          sm={12}
          skipValidate={true}
        />
        <InputDropdown
          name={`docs[${idx}].type`}
          label="檔案類型"
          isReadOnly={isReadOnly}
          ds={docTypes}
          md={3}
          sm={12}
          skipValidate={true}
        />
        {!isReadOnly && <Form.Group as={Col} className="text-right" md={12}>
          <Button className="mx-1" onClick={() => addRow()} variant="info"><i className="fa fa-plus"></i></Button>
          {fields.length > 1 && <Button onClick={() => remove(idx)} variant="info"><i className="fa fa-trash"></i></Button>}
        </Form.Group>}
      </Form.Row>
    })
  }

  return (
    <>
      {!loading && <FormProvider {...methods}><Form onSubmit={handleSubmit(onSubmit)}>
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
          <InputText
            name="title"
            label="講題"
            placeholder="請輸入講題"
            isReadOnly={isReadOnly}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          />
          <InputText
            name="worshipId"
            label="日期"
            placeholder="YYYYMMDD"
            isReadOnly={isReadOnly}
            strongReadOnly={true}
          />
        </Form.Row>
        <Form.Row>
          <InputDropdown
            name="type"
            label="分類"
            isReadOnly={isReadOnly}
            ds={dropdownData}
            validateFn={Validators.NoWhiteSpace}
          />
          <InputText
            name="messenger"
            label="講員"
            placeholder="請輸入講員姓名"
            isReadOnly={isReadOnly}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            name="link"
            label="影片連結"
            placeholder="e.g. https://www.abc.com/"
            isReadOnly={isReadOnly}
          />
        </Form.Row>
        {rowGenerator()}
        <Form.Row className="mb-5">
          <InputQuill
            name="note"
            label="講道筆記"
            isReadOnly={isReadOnly}
          />
        </Form.Row>
        <Form.Row className="mb-5">
          <InputQuill
            name="verse"
            label="經文"
            isReadOnly={isReadOnly}
          />
        </Form.Row>
        {!isReadOnly && <Form.Row>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
            >儲存</Button>
          </Form.Group>
        </Form.Row>}
      </Form></FormProvider>}
    </>
  )
}

export default WorshipEdit;
