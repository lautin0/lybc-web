import { PostDocument, useCreatePostMutation, usePostLazyQuery } from "generated/graphql";
import { useEffect, useState } from "react";

function usePost({ id }: any) {

  const [commentPending, setCommentPending] = useState<boolean>(false)

  const [loadingPost, { called, loading, data: postData, refetch }] = usePostLazyQuery({
    variables: { oid: id }, notifyOnNetworkStatusChange: true
  })

  const [addComment, { data: comment }] = useCreatePostMutation({
    refetchQueries: [
      { query: PostDocument, variables: { oid: id } }
    ]
  })

  useEffect(() => {
    !called && loadingPost()
  }, [called, loadingPost])

  useEffect(() => {
    if (loading !== undefined)
      !loading && setCommentPending(false)
  }, [loading])

  return { loading, postData, comment, refetch, addComment, commentPending, setCommentPending }

}

export default usePost;