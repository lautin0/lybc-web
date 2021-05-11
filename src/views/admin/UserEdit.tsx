import { Button, Divider, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, Switch, Typography } from "@material-ui/core";
import { setLoading } from "actions";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputText from "components/Forms/MuiInputText";
import { AccountStatus, Gender, Role, UpdateUser, User, useUpdateUserMutation, useUserQuery } from "generated/graphql";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useModalStore } from "store";

const useStyles = makeStyles(theme => ({
   divider: {
      width: '100%',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
         width: '60%'
      }
   }
}))

export default function UserEdit() {

   const classes = useStyles()

   const dispatch = useDispatch()

   const history = useHistory()
   const location = useLocation()

   const { username } = useParams<any>()

   const { loading, data, refetch } = useUserQuery({ variables: { username: username }, notifyOnNetworkStatusChange: true })
   const [updateUser, { data: updatedUserData }] = useUpdateUserMutation()

   const setMessage = useModalStore(state => state.setMessage)
   const setErrorModal = useModalStore(state => state.setError)

   const [checked, setChecked] = useState(false)

   const methods = useForm<User>({
      defaultValues: {
         username: "",
         phone: "",
         email: "",
         name: "",
         nameC: "",
      }
   })

   const { handleSubmit, control, reset } = methods

   const onSubmit = (formData: any) => {
      if (data == null)
         return
      // let dob = date?.format('yyyy-MM-DDTHH:mm:ssZ')
      dispatch(setLoading(true))

      let tmp: UpdateUser = {
         username: data.user?.username!,
         role: data.user?.role!,
         name: formData.name,
         nameC: formData.nameC,
         title: formData.title,
         titleC: formData.titleC,
         dob: data.user?.dob,
         gender: formData.gender,
         email: formData.email.length == 0 ? null : formData.email,
         phone: formData.phone.length == 0 ? null : formData.phone,
         profilePicURI: data.user?.profilePicURI,
         status: checked ? AccountStatus.Active : AccountStatus.Suspended
      }

      updateUser({
         variables: {
            input: {
               ...tmp
            },
         }
      }).catch((err: any) => {
         dispatch(setLoading(false))
         setErrorModal(err)
      }).then(e => {
         setMessage('app.sys.save-success')
         dispatch(setLoading(false))
         reset();
         history.push('/admin/users')
      })
   }

   useEffect(() => {
      if (data !== undefined) {
         reset({
            username: data.user?.username,
            phone: data.user?.phone!,
            email: data.user?.email!,
            name: data.user?.name,
            nameC: data.user?.nameC,
            role: data.user?.role,
            gender: data.user?.gender,
            title: data.user?.title,
            titleC: data.user?.titleC
         })
         setChecked(data.user?.status === AccountStatus.Active)
      }
   }, [data])

   useEffect(() => {
      if (data != null) {
         dispatch(setLoading(true))
         refetch();
      }
   }, [location, dispatch, refetch])

   // useEffect(() => {
   //    if (updatedUserData !== undefined) {
   //       setMessage('app.sys.save-success')
   //       dispatch(setLoading(false))
   //       reset();
   //       history.push('/admin/users')
   //    }
   // }, [updatedUserData, dispatch, reset, history])

   useEffect(() => {
      if (loading === false) {
         dispatch(setLoading(false))
      } else {
         dispatch(setLoading(true))
      }
   }, [loading, dispatch])

   return <FormProvider {...methods}>
      <Typography className="my-3" variant="h4">會員管理</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
         <Typography variant="h5">一般</Typography>
         <Divider className={classes.divider} />
         <Grid container direction="row">
            <Grid container item xs={12} md={6} lg={4} direction="column" spacing={2}>
               <Grid item>
                  <MuiInputText
                     name="username"
                     label="用戶編號"
                     isReadOnly={true}
                     size="small"
                  />
               </Grid>
               <Grid item>
                  <Typography>性別</Typography>
                  <Controller
                     as={
                        <RadioGroup aria-label="gender" row>
                           <FormControlLabel
                              value={Gender.Male.toString()}
                              control={<Radio color="primary" />}
                              label="男" />
                           <FormControlLabel
                              value={Gender.Female.toString()}
                              control={<Radio color="primary" />}
                              label="女"
                           />
                        </RadioGroup>
                     }
                     name="gender"
                     control={control}
                     defaultValue={null}
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="nameC"
                     label="中文名稱"
                     size="small"
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="name"
                     label="英文名稱"
                     size="small"
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="phone"
                     label="聯絡電話"
                     size="small"
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="email"
                     label="電郵地址"
                     size="small"
                  />
               </Grid>
            </Grid>
            <Grid container item xs={12} md={6} lg={4} direction="column" spacing={2}>
               <Grid item>
                  <MuiInputDropdown
                     name="role"
                     label="角色"
                     size="small"
                     ds={[
                        { value: Role.Admin, display: "管理員👑", disabled: false },
                        { value: Role.Worker, display: "同工", disabled: false },
                        { value: Role.Member, display: "會友", disabled: false },
                        { value: Role.Public, display: "公共帳號", disabled: false }
                     ]}
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="titleC"
                     label="中文頭銜"
                     size="small"
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="title"
                     label="英文頭銜"
                     size="small"
                  />
               </Grid>
            </Grid>
         </Grid>
         <Typography className="mt-3" variant="h5">選項</Typography>
         <Divider className={classes.divider} />
         <Grid container spacing={2} direction="row">
            <Grid item>
               <Typography color={checked ? "primary" : "secondary"} variant="h5">{checked ? "已啟用" : "已停用"}</Typography>
            </Grid>
            <Grid item>
               <Switch
                  onChange={() => setChecked(!checked)}
                  checked={checked}
                  color="primary"
               />
            </Grid>
         </Grid>
         <Grid className="mt-3" container spacing={2} direction="column">
            <Grid item>
               <Button
                  variant="contained"
                  color="primary"
                  type="submit"
               >
                  更新
               </Button>
            </Grid>
         </Grid>
      </form>
   </FormProvider >
}