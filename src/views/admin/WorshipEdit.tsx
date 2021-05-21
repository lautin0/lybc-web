import { createStyles, Grid, makeStyles, Button, Divider, Typography, LinearProgress } from '@material-ui/core';
import { Add, Delete, Lock, LockOpen } from '@material-ui/icons';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import InputQuill from 'components/Forms/InputQuill';
import MuiInputDropdown from 'components/Forms/MuiInputDropdown';
import MuiInputText from 'components/Forms/MuiInputText';
import { useUpdateWorshipMutation, useWorshipQuery } from 'generated/graphql';
import useLanguage from 'hooks/useLanguage';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RootState } from 'reducers';
import { useModalStore } from 'store';
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

  const setMessage = useModalStore(state => state.setMessage)
  const setModalError = useModalStore(state => state.setError)

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const [updateWorship, { loading: updateLoading }] = useUpdateWorshipMutation()

  const { loading, data: wData, refetch } = useWorshipQuery({
    variables: {
      worshipId: id
    }
  });

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
    }).then(res => {
      setMessage('app.sys.save-success')
      reset();
      history.push('/admin/worships')
    })
      .catch((err: any) => {
        setModalError(err)
        history.push('/admin/worships')
      })
  }

  useEffect(() => {
    register('note')
    register('verse')
  }, [register])

  useEffect(() => {
    if (wData !== undefined) {
      setTimeout(() => {
        reset({
          ...wData.worship,
          note: wData.worship?.note!,
          link: wData.worship?.link!,
          verse: wData.worship?.verse!,
        })
      })
    }
  }, [wData, reset])

  useEffect(() => {
    if (refetch !== undefined) {
      refetch();
    }
  }, [location, refetch])

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
  }, [locale, intl])

  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={item.id}>
        <MuiInputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          isReadOnly={isReadOnly}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          xs={12}
          skipValidate={true}
        />
        <MuiInputText
          name={`docs[${idx}].title`}
          label="名稱"
          isReadOnly={isReadOnly}
          md={3}
          xs={12}
          skipValidate={true}
        />
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
      {(loading || updateLoading) && <LinearProgress />}
      {!loading && <>
        <RouterBreadcrumbs />
        {!loading && <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" className="my-3">崇拜資料</Typography>
            {isReadOnly && <Button onClick={() => setIsReadOnly(false)} className={classes.button} variant="contained" color="secondary" startIcon={<Lock />}>解鎖</Button>}
            {!isReadOnly && <Button onClick={() => setIsReadOnly(true)} className={classes.button} variant="contained" color="primary" startIcon={<LockOpen />}>鎖定</Button>}
            <Form.Row className="mt-3 mb-5">
              <MuiInputText
                name="title"
                label="講題"
                placeholder="請輸入講題"
                md={5}
                xs={12}
                isReadOnly={isReadOnly}
                validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
              />
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
            <Form.Row className="mb-5">
              <MuiInputDropdown
                name="type"
                label="分類"
                isReadOnly={isReadOnly}
                ds={dropdownData}
                md={5}
                xs={12}
                validateFn={Validators.NoWhiteSpace}
              />
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
            <Form.Row className="mb-5">
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
      </>}
      {updateLoading && <LinearProgress />}
    </>
  )
}

export default WorshipEdit;
