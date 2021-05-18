import { Button, createStyles, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { setLoading } from 'actions';
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
import { useSelector, useDispatch } from 'react-redux';
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
      docs: [...formDef.docs] as object
    }
  })

  const { register, getValues, handleSubmit, reset, control, trigger } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docs"
  });

  const [addWorship] = useCreateWorshipMutation()

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
    }).then(res => {
      setMessage('app.sys.save-success')
      reset();
      history.push('/admin/worships')
    })
      .catch((err: any) => {
        setModalError(err)
        reset();
      }).finally(() => dispatch(setLoading(false)))
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
        {/* <InputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputText
          name={`docs[${idx}].link`}
          label={`檔案${idx + 1}連結`}
          placeholder="e.g. https://www.abc.com/"
          md={5}
          xs={12}
          skipValidate={true}
        />
        {/* <InputText
          name={`docs[${idx}].title`}
          label="名稱"
          md={{ span: 3, offset: 1 }}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputText
          name={`docs[${idx}].title`}
          label="名稱"
          md={3}
          xs={12}
          skipValidate={true}
        />
        {/* <InputDropdown
          name={`docs[${idx}].type`}
          label="檔案類型"
          ds={docTypes}
          md={2}
          sm={12}
          skipValidate={true}
        /> */}
        <MuiInputDropdown
          name={`docs[${idx}].type`}
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
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <RouterBreadcrumbs />
        {/* <h3 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h3> */}
        <Typography variant="h5" className="my-3">崇拜資料</Typography>
        <Form.Row className="mb-5">
          {/* <InputText
            name="title"
            label="講題"
            placeholder="請輸入講題"
            md={5}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          /> */}
          <MuiInputText
            md={5}
            xs={12}
            name="title"
            label="講題"
            placeholder="請輸入講題"
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          />
          {/* <InputText
            name="worshipId"
            label="日期"
            placeholder="YYYYMMDD"
            md={{ span: 5, offset: 1 }}
            validateFn={Validators.NoWhiteSpace}
          /> */}
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
          {/* <InputDropdown
            name="type"
            label="分類"
            ds={dropdownData}
            md={5}
            validateFn={Validators.NoWhiteSpace}
          /> */}
          <MuiInputDropdown
            md={5}
            xs={12}
            ds={dropdownData}
            name="type"
            label="分類"
            validateFn={Validators.NoWhiteSpace}
          />
          {/* <InputText
            name="messenger"
            label="講員"
            placeholder="請輸入講員姓名"
            md={{ span: 5, offset: 1 }}
            validateFn={Validators.NoWhiteSpaceForValue(getValues("type"), "主日崇拜")}
          /> */}
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
          {/* <InputText
            name="link"
            label="影片連結"
            md={11}
            placeholder="e.g. https://www.abc.com/"
          /> */}
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
  )
}

export default WorshipCreate;
