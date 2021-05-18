import { Button, Typography } from '@material-ui/core';
import { setLoading } from 'actions';
import RouterBreadcrumbs from 'components/Breadcrumbs/RouterBreadcrumbs';
import DropzoneCustom from 'components/DropzoneCustom';
import InputQuill from 'components/Forms/InputQuill';
import MuiInputText from 'components/Forms/MuiInputText';
import { NewPost, PostType, useCreatePostMutation } from 'generated/graphql';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'reducers';
import { useModalStore } from 'store';
import { getTokenValue } from 'utils/utils';
import Validators from 'utils/validator';

function NewsCreate() {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const history = useHistory()

  const dispatch = useDispatch()

  const setMessage = useModalStore(state => state.setMessage)
  const setModalError = useModalStore(state => state.setError)

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles } = dropzoneMethods

  const [addPost] = useCreatePostMutation()

  const methods = useForm({
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const { handleSubmit, reset } = methods

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp: NewPost = { ...data }
    tmp.type = PostType.News
    tmp.username = getTokenValue(tokenPair?.token).username
    let file = acceptedFiles[0]
    addPost({
      variables: {
        input: {
          ...tmp
        },
        image: file
      }
    }).then(res => {
      setMessage('app.sys.save-success')
      reset();
      history.push('/admin/page-management')
    })
      .catch((err: any) => {
        setModalError(err)
        reset();
      }).finally(() => dispatch(setLoading(false)))
  }

  return (
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
        <DropzoneCustom {...dropzoneMethods} />
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
  );
}

export default NewsCreate;