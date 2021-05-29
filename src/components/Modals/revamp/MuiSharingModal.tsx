import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import { setLoading } from 'actions';
import AuthContext from 'context/AuthContext';
import { NewPendingPost, UpdatePendingPost, PostStatus, usePendPostMutation, useUpdatePendingPostMutation, usePendingPostLazyQuery } from 'generated/graphql';
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useModalStore, usePendingPostStore } from 'store'
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

   const { tokenPair } = useContext(AuthContext)

   const dispatch = useDispatch()

   const setMessage = useModalStore(state => state.setMessage)
   const setModalError = useModalStore(state => state.setError)

   const [pendPost] = usePendPostMutation()
   const [updatePendingPost] = useUpdatePendingPostMutation()

   const [readOnly, setReadOnly] = useState(false)

   const isOpen = usePendingPostStore(state => state.isOpen)
   const pendingPostID = usePendingPostStore(state => state.pendingPostID)
   const setOpen = usePendingPostStore(state => state.setOpen)
   const setPendingPostID = usePendingPostStore(state => state.setPendingPostID)

   const intl = useIntl()

   const [loadingPendingPost, { data: pPostData }] = usePendingPostLazyQuery({
      variables: { oid: pendingPostID! },
      notifyOnNetworkStatusChange: true
   })

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
                  status: PostStatus.Pending,
                  doc: file
               },
            }
         }).then(res => {
            setMessage('app.sys.save-success')
            onHide()
         })
            .catch((err: any) => {
               setModalError(err)
               onHide()
            }).finally(() => dispatch(setLoading(false)))
      } else {
         pendPost({
            variables: {
               input: {
                  ...tmp
                  , doc: file
               },
            }
         }).then(res => {
            setMessage('app.sys.save-success')
            onHide()
         })
            .catch((err: any) => {
               setModalError(err)
               onHide()
            }).finally(() => dispatch(setLoading(false)))
      }
   }

   const withdraw = () => {
      dispatch(setLoading(true))
      setReadOnly(false)
      let tmp: UpdatePendingPost = {
         _id: pPostData?.pendingPost?._id,
         status: PostStatus.Withdraw,
         username: getTokenValue(tokenPair?.token).username
      }
      updatePendingPost({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(res => {
         setMessage('app.sys.save-success')
         onHide()
      })
         .catch((err: any) => {
            setModalError(err)
            onHide()
         }).finally(() => dispatch(setLoading(false)))
   }

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
      if (pendingPostID !== null && loadingPendingPost !== null) {
         loadingPendingPost()
      }
   }, [pendingPostID, loadingPendingPost])

   useEffect(() => {
      if (pPostData != null) {
         reset({
            title: pPostData.pendingPost?.title,
            subtitle: pPostData.pendingPost?.subtitle,
            remarks: !pPostData.pendingPost?.remarks ? "" : pPostData.pendingPost.remarks
         })
         setReadOnly(true)
      }
   }, [pPostData, reset])

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
                  <SharingForm2 status={pPostData?.pendingPost?.status} readOnly={readOnly} dropzoneMethods={dropzoneMethods} />
               </DialogContent>
               <DialogActions>
                  {(!pPostData?.pendingPost?.status || pPostData.pendingPost.status === PostStatus.Withhold) && <div>
                     <Button variant="contained" type="submit">{intl.formatMessage({ id: "app.buttons.submit" })}</Button>
                     <Button onClick={onHide} variant="contained" color="secondary" className="ml-2">{intl.formatMessage({ id: "app.buttons.cancel" })}</Button>
                  </div>}
                  {(pPostData?.pendingPost?.status && pPostData.pendingPost.status === PostStatus.Pending) && <div>
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