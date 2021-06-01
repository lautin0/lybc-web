import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import WrappedDropzone from 'components/Dropzone/WrappedDropzone';
import InputQuill from 'components/Forms/InputQuill';
import MuiInputText from 'components/Forms/MuiInputText';
import AuthContext from 'context/AuthContext';
import { NewPost, PostType, useCreatePostMutation } from 'generated/graphql';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useModalStore } from 'store';
import { getTokenValue } from 'utils/utils';
import Validators from 'utils/validator';

const useStyles = makeStyles((theme) => ({
  progress: {
    marginTop: -20,
    position: 'fixed',
    width: 'calc(100% - 300px)',
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: -30,
      left: 0
    }
  }
}))

function NewsCreate() {

  const classes = useStyles()

  const { tokenPair } = useContext(AuthContext)

  const history = useHistory()

  const setMessage = useModalStore(state => state.setMessage)
  const setModalError = useModalStore(state => state.setError)

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles } = dropzoneMethods

  const [addPost, { loading }] = useCreatePostMutation()

  const methods = useForm({
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const { handleSubmit, reset } = methods

  const onSubmit = (data: any) => {
    let tmp: NewPost = { ...data }
    tmp.type = PostType.News
    tmp.username = getTokenValue(tokenPair?.token).username
    let file = acceptedFiles[0]
    addPost({
      variables: {
        input: {
          ...tmp,
          image: file
        },
      }
    }).then(res => {
      setMessage('app.sys.save-success')
      reset();
      history.push('/admin/page-management')
    })
      .catch((err: any) => {
        setModalError(err)
        reset();
      })
  }

  return (
    <>
      {loading && <LinearProgress className={classes.progress} />}
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RouterBreadcrumbs />
          {/* <h3 className="category mt-5" style={{ color: 'black' }}>新增最新消息</h3> */}
          <Typography className="my-3" variant="h5">新增最新消息</Typography>
          <Form.Row>
            {/* <InputText
            md={6}
            name="title"
            label="標題"
            placeholder="請輸入標題"
            validateFn={Validators.NoWhiteSpace}
          /> */}
            <MuiInputText
              md={6}
              xs={12}
              name="title"
              label="標題"
              placeholder="請輸入標題"
              validateFn={Validators.NoWhiteSpace}
            />
          </Form.Row>
          <Form.Row>
            <InputQuill name="content" label="內文" isReadOnly={false} />
          </Form.Row>
          <label className="mt-5">選擇封面</label>
          <WrappedDropzone lg={12} xl={6} {...dropzoneMethods} />
          <Form.Row>
            <Form.Group>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                儲存
            </Button>
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
    </>
  );
}

export default NewsCreate;