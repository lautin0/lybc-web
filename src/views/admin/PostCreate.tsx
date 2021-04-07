import { useMutation } from "@apollo/client";
import { setLoading, setSysMessage, setSystemFailure } from "actions";
import DropzoneCustom from "components/DropzoneCustom";
import InputQuill from "components/Forms/InputQuill";
import InputText from "components/Forms/InputText";
import { NewPost, Post, PostType } from "generated/graphql";
import { ADD_POST } from "graphqls/graphql";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "reducers";
import { getTokenValue } from "utils/utils";
import Validators from "utils/validator";

function PostCreate(props: any) {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const history = useHistory()

  const dispatch = useDispatch()

  const dropzoneMethods = useDropzone({
    accept: 'image/*'
  });

  const { acceptedFiles } = dropzoneMethods

  const [addPost, { data }] = useMutation<
    { createPost: Post },
    { input: NewPost, image: any }
  >(ADD_POST);

  const methods = useForm({
    defaultValues: {
      title: '',
      subtitle: '',
      content: ''
    }
  });

  const { handleSubmit, getValues, reset } = methods

  const onSubmit = (data: any) => {
    dispatch(setLoading(true))
    let tmp: NewPost = { ...data }
    tmp.type = PostType.Sharing
    tmp.username = getTokenValue(tokenPair?.token).username
    if(tmp.content.indexOf('iframe') > -1){
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
      history.push('/admin/page-management')
    }
  }, [data, dispatch, reset, history])

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="category mt-5" style={{ color: 'black' }}>文章內容</h3>
        <Form.Row>
          <InputText
            md={6}
            name="title"
            label="主題"
            placeholder="請輸入主題"
            validateFn={Validators.NoWhiteSpace}
          />
        </Form.Row>
        <Form.Row>
          <InputText
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
              variant="primary"
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

export default PostCreate;