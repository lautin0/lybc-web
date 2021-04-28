import { useMutation, useQuery } from '@apollo/client';
import { createStyles, Grid, makeStyles, Button, Divider, Typography } from '@material-ui/core';
import { Add, Delete, Lock, LockOpen } from '@material-ui/icons';
import { setSysMessage, setLoading, setSystemFailure } from 'actions';
import InputDropdown from 'components/Forms/InputDropdown';
import InputQuill from 'components/Forms/InputQuill';
import InputText from 'components/Forms/InputText';
import MuiInputDropdown from 'components/Forms/MuiInputDropdown';
import MuiInputText from 'components/Forms/MuiInputText';
import { NewWorship, NewWorshipDoc, Worship } from 'generated/graphql';
import { GET_WORSHIP, UPDATE_WORSHIP } from 'graphqls/graphql';
import useLanguage from 'hooks/useLanguage';
import React, { useEffect, useState } from 'react'
import { Form, Col } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RootState } from 'reducers';
import Validators from 'utils/validator';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    divider: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      },
    }
  }),
);

function WorshipEdit() {

  const classes = useStyles()

  const { id } = useParams<any>()

  const [locale] = useLanguage()

  const intl = useIntl()

  const [isReadOnly, setIsReadOnly] = useState(true)

  const history = useHistory()

  const location = useLocation()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const [updateWorship, { data }] = useMutation<
    { updateWorship: any },
    { input: NewWorship, docs: NewWorshipDoc[] }
  >(UPDATE_WORSHIP);
  const { loading, data: wData, refetch } = useQuery<{ worship: Worship }, { worshipId: string }>(GET_WORSHIP, { variables: { worshipId: id }, notifyOnNetworkStatusChange: true })

  const methods = useForm({
    defaultValues: {
      ...formDef,
      link: '',
      note: '',
      verse: '',
      docs: [...formDef.docs] as object
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

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.admin.panel" })
  }, [locale])

  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={item.id}>
        {/* <InputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          isReadOnly={isReadOnly}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          isReadOnly={isReadOnly}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          xs={12}
          skipValidate={true}
        />
        {/* <InputText
          name={`docs[${idx}].title`}
          label="名稱"
          isReadOnly={isReadOnly}
          md={{ span: 3, offset: 1 }}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputText
          name={`docs[${idx}].title`}
          label="名稱"
          isReadOnly={isReadOnly}
          md={3}
          xs={12}
          skipValidate={true}
        />
        {/* <InputDropdown
          name={`docs[${idx}].type`}
          label="檔案類型"
          isReadOnly={isReadOnly}
          ds={docTypes}
          md={2}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputDropdown
          name={`docs[${idx}].type`}
          label="檔案類型"
          isReadOnly={isReadOnly}
          ds={docTypes}
          md={2}
          xs={12}
          skipValidate={true}
        />
        {!isReadOnly && <Grid container item justify="flex-end" md={10}>
          <Button onClick={() => addRow()} className={classes.button} variant="contained" color="primary" startIcon={<Add />}>新增</Button>
          {fields.length > 1 && <Button onClick={() => remove(idx)} className={classes.button} variant="contained" color="secondary" startIcon={<Delete />}>刪除</Button>}
        </Grid>}
      </Form.Row>
    })
  }

  return (
    <>
      {!loading && <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <h3 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h3> */}
          <Typography variant="h4" className="mt-3">崇拜資料</Typography>
          {isReadOnly && <Button onClick={() => setIsReadOnly(false)} className={classes.button} variant="contained" color="secondary" startIcon={<Lock />}>解鎖</Button>}
          {!isReadOnly && <Button onClick={() => setIsReadOnly(true)} className={classes.button} variant="contained" color="primary" startIcon={<LockOpen />}>鎖定</Button>}
          <Form.Row>
            {/* <InputText
              name="title"
              label="講題"
              placeholder="請輸入講題"
              md={5}
              isReadOnly={isReadOnly}
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            /> */}
            <MuiInputText
              name="title"
              label="講題"
              placeholder="請輸入講題"
              md={5}
              xs={12}
              isReadOnly={isReadOnly}
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            />
            {/* <InputText
              name="worshipId"
              label="日期"
              placeholder="YYYYMMDD"
              isReadOnly={isReadOnly}
              md={{ span: 5, offset: 1 }}
              strongReadOnly={true}
            /> */}
            <MuiInputText
              name="worshipId"
              label="日期"
              placeholder="YYYYMMDD"
              isReadOnly={isReadOnly}
              md={5}
              xs={12}
              strongReadOnly={true}
            />
          </Form.Row>
          <Form.Row>
            {/* <InputDropdown
              name="type"
              label="分類"
              isReadOnly={isReadOnly}
              ds={dropdownData}
              md={5}
              validateFn={Validators.NoWhiteSpace}
            /> */}
            <MuiInputDropdown
              name="type"
              label="分類"
              isReadOnly={isReadOnly}
              ds={dropdownData}
              md={5}
              xs={12}
              validateFn={Validators.NoWhiteSpace}
            />
            {/* <InputText
              name="messenger"
              label="講員"
              placeholder="請輸入講員姓名"
              isReadOnly={isReadOnly}
              md={{ span: 5, offset: 1 }}
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            /> */}
            <MuiInputText
              name="messenger"
              label="講員"
              placeholder="請輸入講員姓名"
              isReadOnly={isReadOnly}
              md={5}
              xs={12}
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            />
          </Form.Row>
          <Form.Row>
            {/* <InputText
              name="link"
              label="影片連結"
              md={11}
              placeholder="e.g. https://www.abc.com/"
              isReadOnly={isReadOnly}
            /> */}
            <MuiInputText
              name="link"
              label="影片連結"
              md={10}
              xs={12}
              placeholder="e.g. https://www.abc.com/"
              isReadOnly={isReadOnly}
            />
          </Form.Row>
          <Divider className={classes.divider} light />
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
                variant="contained"
                color="primary"
                type="submit"
              >儲存</Button>
            </Form.Group>
          </Form.Row>}
        </Form></FormProvider>}
    </>
  )
}

export default WorshipEdit;
