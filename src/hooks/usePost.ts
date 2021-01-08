import { useLazyQuery, useMutation } from "@apollo/client";
import { NewPost, Post } from "generated/graphql";
import { ADD_POST, GET_POST } from "graphqls/graphql";
import { useEffect, useState } from "react";

function usePost(props: any) {

  const { id } = props

  const [commentPending, setCommentPending] = useState<boolean>(false)

  const [loadingPost, { called, loading, data: postData, refetch }] = useLazyQuery<{ post: Post }, { oid: string }>
    (GET_POST, { variables: { oid: id }, notifyOnNetworkStatusChange: true });

  const [addComment, { data: comment }] = useMutation<
    { createPost: Post },
    { input: NewPost }
  >(ADD_POST);

  useEffect(() => {
    !called && loadingPost()
  }, [called, loadingPost])

  useEffect(() => {
    if (comment !== undefined) {
      refetch && refetch()
    }
  }, [comment, refetch])

  useEffect(() => {
    if (loading !== undefined)
      !loading && setCommentPending(false)
  }, [loading])

  return { loading, postData, comment, refetch, addComment, commentPending, setCommentPending }

}

export default usePost;