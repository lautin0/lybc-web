import { Button, LinearProgress, Typography } from "@material-ui/core";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import DropzoneCustom from "components/DropzoneCustom";
import InputQuill from "components/Forms/InputQuill";
import MuiInputText from "components/Forms/MuiInputText";
import { NewPost, PostType, useCreatePostMutation } from "generated/graphql";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "reducers";
import { useModalStore } from "store";
import { getTokenValue } from "utils/utils";
import Validators from "utils/validator";

function PostCreate(props: any) {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

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
      subtitle: '',
      content: ''
    }
  });

  const { handleSubmit, reset } = methods

  const onSubmit = (data: any) => {
    let tmp: NewPost = { ...data }
    tmp.type = PostType.Sharing
    tmp.username = getTokenValue(tokenPair?.token).username
    if (tmp.content.indexOf('iframe') > -1) {
      tmp.content = tmp.content.replace("iframe", "iframe width=\"660\" height=\"371\"")
    }
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
      })
  }

  return (
    <>
      {loading && <LinearProgress />}
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RouterBreadcrumbs />
          <Typography className="my-3" variant="h5">文章內容</Typography>
          <Form.Row>
            <MuiInputText
              md={6}
              xs={12}
              name="title"
              label="主題"
              placeholder="請輸入主題"
              validateFn={Validators.NoWhiteSpace}
            />
          </Form.Row>
          <Form.Row>
            <MuiInputText
              xs={12}
              name="subtitle"
              label="副標題"
              placeholder="請輸入副標題"
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
      {loading && <LinearProgress />}
    </>
  );
}

export default PostCreate;