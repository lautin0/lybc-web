import { useMutation, useLazyQuery } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import { setLoading, setSystemFailure, setSysMessage } from 'actions';
import { PendingPost, NewPendingPost, UpdatePendingPost, PostStatus } from 'generated/graphql';
import { PEND_POST, UPDATE_PENDING_POST, GET_PENDING_POST } from 'graphqls/graphql';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { usePendingPostStore } from 'store'
import { getTokenValue } from 'utils/utils';
import SharingForm2 from 'views/articles/SharingForm2';

const useStyles = makeStyles((theme) => ({
   danger: {
      backgroundColor: red[700],
      color: theme.palette.primary.contrastText
   },
}))

export default function MuiSharingModal() {

   const classes = useStyles()

   const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

   const dispatch = useDispatch()

   const [pendPost, { data }] = useMutation<
      { pendingPost: PendingPost },
      { input: NewPendingPost, doc: any }
   >(PEND_POST);
   const [updatePendingPost, { data: updateData }] = useMutation<
      { pendingPost: PendingPost },
      { input: UpdatePendingPost, doc?: any }
   >(UPDATE_PENDING_POST);

   const [readOnly, setReadOnly] = useState(false)

   const title = usePendingPostStore(state => state.title)
   const isOpen = usePendingPostStore(state => state.isOpen)
   const pendingPostID = usePendingPostStore(state => state.pendingPostID)
   const setOpen = usePendingPostStore(state => state.setOpen)
   const setPendingPostID = usePendingPostStore(state => state.setPendingPostID)

   const intl = useIntl()

   const [loadingPendingPost, { called, loading, data: pPostData, refetch }] = useLazyQuery<{ pendingPost: PendingPost }, { oid: string }>
      (GET_PENDING_POST, { variables: { oid: pendingPostID! }, notifyOnNetworkStatusChange: true });

   const dropzoneMethods = useDropzone({
      accept: '.docx,.pdf'
   });

   const { acceptedFiles } = dropzoneMethods

   const methods = useForm({
      defaultValues: {
         title: '',
         subtitle: '',
         remarks: ''
      }
   })

   const { handleSubmit, reset } = methods

   const onSubmit = (data: any) => {
      dispatch(setLoading(true))
      let tmp: NewPendingPost = { ...data }
      tmp.username = getTokenValue(tokenPair?.token).username
      let file = acceptedFiles[0]
      if (pendingPostID.length > 0) {
         updatePendingPost({
            variables: {
               input: {
                  _id: pendingPostID,
                  username: getTokenValue(tokenPair?.token).username,
                  status: PostStatus.Pending
               },
               doc: file
            }
         }).catch((err: any) => {
            dispatch(setLoading(false))
            dispatch(setSystemFailure(err))
            onHide()
         })
      } else {
         pendPost({
            variables: {
               input: {
                  ...tmp
               },
               doc: file
            }
         }).catch((err: any) => {
            dispatch(setLoading(false))
            dispatch(setSystemFailure(err))
            onHide()
         })
      }
   }

   const withdraw = () => {
      dispatch(setLoading(true))
      setReadOnly(false)
      let tmp: UpdatePendingPost = {
         _id: pPostData?.pendingPost._id,
         status: PostStatus.Withdraw,
         username: getTokenValue(tokenPair?.token).username
      }
      updatePendingPost({
         variables: {
            input: {
               ...tmp
            },
         }
      }).catch((err: any) => {
         dispatch(setLoading(false))
         dispatch(setSystemFailure(err))
         onHide()
      })
   }

   useEffect(() => {
      if (data !== undefined) {
         dispatch(setSysMessage('app.sys.save-success'))
         dispatch(setLoading(false))
         onHide()
      }
   }, [data, dispatch, reset])

   useEffect(() => {
      if (updateData !== undefined) {
         dispatch(setSysMessage('app.sys.save-success'))
         dispatch(setLoading(false))
         onHide()
      }
   }, [updateData, dispatch, reset])

   const onHide = () => {
      reset({
         title: '',
         subtitle: '',
         remarks: ''
      })
      setReadOnly(false)
      setOpen(false)
      setPendingPostID('')
   }

   useEffect(() => {
      if (pendingPostID != null) {
         loadingPendingPost()
      }
   }, [pendingPostID])

   useEffect(() => {
      if (pPostData != null) {
         reset({
            title: pPostData.pendingPost.title,
            subtitle: pPostData.pendingPost.subtitle,
            remarks: pPostData.pendingPost.remarks == null ? "" : pPostData.pendingPost.remarks
         })
         setReadOnly(true)
      }
   }, [pPostData])

   useEffect(() => {
      let thisRef = React.createRef();
      ReactDOM.createPortal(thisRef, document.body)
   })
   return (
      <Dialog open={isOpen} onClose={onHide} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
         <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogTitle id="form-dialog-title">表單資料</DialogTitle>
               <DialogContent>
                  <SharingForm2 status={pPostData?.pendingPost.status} readOnly={readOnly} dropzoneMethods={dropzoneMethods} />
               </DialogContent>
               <DialogActions>
                  {(pPostData?.pendingPost.status == null || pPostData.pendingPost.status === PostStatus.Withhold) && <div>
                     <Button variant="contained" type="submit">{intl.formatMessage({ id: "app.buttons.submit" })}</Button>
                     <Button onClick={onHide} variant="contained" color="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
                  </div>}
                  {(pPostData?.pendingPost.status != null && pPostData.pendingPost.status === PostStatus.Pending) && <div>
                     <Button
                        type="button"
                        variant="contained"
                        className={classes.danger}
                        onClick={withdraw}
                     >{intl.formatMessage({ id: "app.buttons.withdraw" })}</Button>
                  </div>}
               </DialogActions>
            </form>
         </FormProvider>
      </Dialog>
   )
}