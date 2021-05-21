import { Button, createStyles, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import InputQuill from 'components/Forms/InputQuill';
import MuiInputDropdown from 'components/Forms/MuiInputDropdown';
import MuiInputText from 'components/Forms/MuiInputText';
import { useCreateWorshipMutation } from 'generated/graphql';
import useLanguage from 'hooks/useLanguage';
import { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

function WorshipCreate() {

  const classes = useStyles()

  const [locale] = useLanguage()

  const intl = useIntl()

  const history = useHistory()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const setMessage = useModalStore(state => state.setMessage)
  const setModalError = useModalStore(state => state.setError)

  const methods = useForm({
    defaultValues: {
      ...formDef,
      link: '',
      note: '',
      verse: '',
      docs: [...formDef.docs] as Array<any>
    }
  })

  const { register, getValues, handleSubmit, reset, control, trigger } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docs"
  });

  const [addWorship, { loading }] = useCreateWorshipMutation()

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
    addWorship({
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
        reset();
      })
  }

  useEffect(() => {
    register('note')
    register('verse')
  }, [register])

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
          name={`docs.${idx}.link` as const}
          label={`檔案${idx + 1}連結`}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          xs={12}
          skipValidate={true}
        />
        <MuiInputText
          name={`docs.${idx}.title` as const}
          label="名稱"
          md={3}
          xs={12}
          skipValidate={true}
        />
        <MuiInputDropdown
          name={`docs.${idx}.type` as const}
          label="檔案類型"
          ds={docTypes}
          md={2}
          xs={12}
          skipValidate={true}
        />
        <Grid container item justify="flex-end" md={10}>
          <Button onClick={() => addRow()} className={classes.button} variant="contained" color="primary" startIcon={<Add />}>新增</Button>
          {fields.length > 1 && <Button onClick={() => remove(idx)} className={classes.button} variant="contained" color="secondary" startIcon={<Delete />}>刪除</Button>}
        </Grid>
      </Form.Row>
    })
  }

  return (
    <>
      < FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RouterBreadcrumbs />
          <Typography variant="h5" className="my-3">崇拜資料</Typography>
          <Form.Row className="mb-5">
            <MuiInputText
              md={5}
              xs={12}
              name="title"
              label="講題"
              placeholder="請輸入講題"
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            />
            <MuiInputText
              md={5}
              xs={12}
              name="worshipId"
              label="日期"
              placeholder="YYYYMMDD"
              validateFn={Validators.NoWhiteSpace}
            />
          </Form.Row>
          <Form.Row className="mb-5">
            <MuiInputDropdown
              md={5}
              xs={12}
              ds={dropdownData}
              name="type"
              label="分類"
              validateFn={Validators.NoWhiteSpace}
            />
            <MuiInputText
              md={5}
              xs={12}
              name="messenger"
              label="講員"
              placeholder="請輸入講員姓名"
              validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
            />
          </Form.Row>
          <Form.Row>
            <MuiInputText
              md={10}
              xs={12}
              name="link"
              label="影片連結"
              placeholder="e.g. https://www.abc.com/"
            />
          </Form.Row>
          <Divider className={classes.divider} light />
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
                variant="contained"
                color="primary"
                type="submit"
              >儲存</Button>
              <Button
                className="mx-3"
                onClick={() => {
                  reset()
                  trigger()
                }}
              >
                重設
          </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </FormProvider>
      {loading && <LinearProgress />}
    </>
  )
}

export default WorshipCreate;
