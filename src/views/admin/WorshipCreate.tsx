import { useMutation } from '@apollo/client';
import { setSysMessage, setLoading, setSystemFailure } from 'actions';
import InputDropdown from 'components/Forms/InputDropdown';
import InputQuill from 'components/Forms/InputQuill';
import InputText from 'components/Forms/InputText';
import { NewWorship, NewWorshipDoc, Worship } from 'generated/graphql';
import { ADD_WORSHIP } from 'graphqls/graphql';
import useLanguage from 'hooks/useLanguage';
import React, { useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'reducers';
import Validators from 'utils/validator';

function WorshipCreate() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const history = useHistory()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const methods = useForm({
    defaultValues: {
      ...formDef,
      link: '',
      note: '',
      verse: '',
      docs: [ ...formDef.docs ] as object
    }
  })

  const { register, getValues, handleSubmit, reset, control } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docs"
  });

  const [addWorship, { data }] = useMutation<
    { createWorship: Worship },
    { input: NewWorship, docs: NewWorshipDoc[] }
  >(ADD_WORSHIP);

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
    addWorship({
      variables: {
        input: {
          ...tmp
        },
        docs: [...tmpDocs]
      }
    }).catch((err: any) => {
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      reset();
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('app.sys.save-success'))
      dispatch(setLoading(false))
      reset();
      history.push('/admin/worships')
    }
  }, [data, dispatch, reset, history])

  useEffect(() => {
    register('note')
    register('verse')
  }, [register])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.admin.panel"})
  }, [locale])


  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={item.id}>
        <InputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          sm={12}
          skipValidate={true}
        />
        <InputText
          name={`docs[${idx}].title`}
          label="名稱"
          md={{ span: 3, offset: 1 }}
          sm={12}
          skipValidate={true}
        />
        <InputDropdown
          name={`docs[${idx}].type`}
          label="檔案類型"
          ds={docTypes}
          md={2}
          sm={12}
          skipValidate={true}
        />
        <Form.Group as={Col} className="text-right" md={11}>
          <Button className="mx-1" onClick={() => addRow()} variant="info"><i className="fa fa-plus"></i></Button>
          {fields.length > 1 && <Button onClick={() => remove(idx)} variant="info"><i className="fa fa-trash"></i></Button>}
        </Form.Group>
      </Form.Row>
    })
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h2>
        <Form.Row>
          <InputText
            name="title"
            label="講題"
            placeholder="請輸入講題"
            md={5}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          />
          <InputText
            name="worshipId"
            label="日期"
            placeholder="YYYYMMDD"
            md={{ span: 5, offset: 1 }}
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <InputDropdown
            name="type"
            label="分類"
            ds={dropdownData}
            md={5}
            validateFn={Validators.NoWhiteSpace}
          />
          <InputText
            name="messenger"
            label="講員"
            placeholder="請輸入講員姓名"
            md={{ span: 5, offset: 1 }}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            name="link"
            label="影片連結"
            md={11}
            placeholder="e.g. https://www.abc.com/"
          />
        </Form.Row>
        {rowGenerator()}
        <Form.Row className="mb-5">
          <InputQuill
            name="note"
            label="講道筆記"
          />
        </Form.Row>
        <Form.Row className="mb-5">
          <InputQuill
            name="verse"
            label="經文"
          />
        </Form.Row>
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
  )
}

export default WorshipCreate;
