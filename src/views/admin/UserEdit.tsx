import { Button, Divider, FormControlLabel, Grid, InputAdornment, LinearProgress, makeStyles, Radio, RadioGroup, Switch, TextField, Typography } from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputText from "components/Forms/MuiInputText";
import { AccountStatus, Gender, NewPasswordAdmin, Role, UpdateUser, useChangeAccountStatusMutation, useChangePasswordAdminMutation, User, useUpdateUserMutation, useUserQuery } from "generated/graphql";
import moment, { Moment } from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useModalStore } from "store";
import { getTokenValue } from "utils/utils";

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

   const history = useHistory()
   const location = useLocation()

   const pwdInitState = {
      admPassword: '',
      admUsername: '',
      username: '',
      newPassword: ''
   }
   const [pwdConf, setPwdConf] = useState('')
   const [pwdErrors, setpwdErrors] = useState<any>({})
   const [newPasswordAdmin, setNewPasswordAdmin] = useState<NewPasswordAdmin>(pwdInitState)

   const [date, setDate] = useState<Moment>()

   const [locked, setLocked] = useState(true)

   const { username } = useParams<any>()

   const { loading, data, refetch } = useUserQuery({ variables: { username: username }, notifyOnNetworkStatusChange: true })
   const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation()
   const [changePassword, { loading: changePasswordLoading }] = useChangePasswordAdminMutation()
   const [changeAccountStatus, { loading: changeStatLoading }] = useChangeAccountStatusMutation()

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

   const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewPasswordAdmin({
         ...newPasswordAdmin,
         [e.target.id]: e.target.value
      })
   }

   const onSubmit = (formData: any) => {
      if (!data)
         return

      let tmp: UpdateUser = {
         username: data.user?.username!,
         role: data.user?.role!,
         name: formData.name,
         nameC: formData.nameC,
         title: formData.title,
         titleC: formData.titleC,
         dob: date,
         gender: formData.gender,
         email: !formData.email || formData.email.length === 0 ? null : formData.email,
         phone: !formData.phone || formData.phone.length === 0 ? null : formData.phone,
         profilePicURI: data.user?.profilePicURI,
         status: data.user?.status
      }

      updateUser({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(e => {
         setMessage('app.sys.save-success')
         reset();
         history.push('/admin/users')
      }).catch((err: any) => {
         setErrorModal(err)
      })
   }

   const validationMachine = (id: string): boolean => {

      switch (id) {
         case "admPassword":
            if (newPasswordAdmin.admPassword === '') {
               setpwdErrors({
                  ...pwdErrors,
                  admPassword: { error: "請輸入管理員密碼" },
               })
               return false
            } else {
               let dummy = pwdErrors
               delete dummy.admPassword
               setpwdErrors(dummy)
            }
            break
         case "newPassword":
         case "pwdConf":
            if (id === "newPassword" && newPasswordAdmin.newPassword === '') {
               setpwdErrors({
                  ...pwdErrors,
                  newPassword: { error: "請輸入新密碼" },
               })
               return false
            } else {
               let dummy = pwdErrors
               delete dummy.newPassword
               setpwdErrors(dummy)
            }
            if (id === "pwdConf" && pwdConf === '') {
               setpwdErrors({
                  ...pwdErrors,
                  pwdConf: { error: "請輸入確認密碼" },
               })
               return false
            } else {
               let dummy = pwdErrors
               delete dummy.pwdConf
               setpwdErrors(dummy)
            }
            if (newPasswordAdmin.newPassword !== pwdConf) {
               setpwdErrors({
                  ...pwdErrors,
                  pwdConf: { error: "輸入的新密碼不一致" },
                  newPassword: { error: "輸入的新密碼不一致" },
               })
               return false
            } else {
               let dummy = pwdErrors
               delete dummy.newPassword
               delete dummy.pwdConf
               setpwdErrors(dummy)
            }
            break;
      }

      return true
   }

   const handleChangePassword = () => {
      if (locked) {
         setLocked(false)
         return
      }

      let valid = true
      for (const s of ["admPassword", "newPassword", "pwdConf"]) {
         if (!validationMachine(s)) {
            valid = false
            break
         }
      }
      if (!valid)
         return

      let tmp: NewPasswordAdmin = {
         admUsername: getTokenValue(localStorage.getItem('token')).username,
         admPassword: newPasswordAdmin.admPassword,
         username: data?.user?.username!,
         newPassword: newPasswordAdmin.newPassword,
      }
      changePassword({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(res => {
         setMessage('app.sys.save-success')
         setLocked(true)
         setpwdErrors({})
         setNewPasswordAdmin(pwdInitState)
         refetch()
      }).catch((err: any) => {
         setErrorModal(err)
      })
   }

   useEffect(() => {
      if (data !== undefined && reset !== undefined) {
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
         setDate(moment(data.user?.dob, 'yyyy-MM-DDTHH:mm:ss-SSSS'))
      }
   }, [data, reset])

   useEffect(() => {
      if (refetch !== undefined) {
         refetch();
      }
   }, [location, refetch])

   return (
      <>
         {(loading || updateUserLoading || changePasswordLoading || changeStatLoading) && <LinearProgress />}
         {!loading && <FormProvider {...methods}>
            <RouterBreadcrumbs />
            <Typography className="my-3" variant="h5">會員管理</Typography>
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
                           render={({ field, fieldState }) =>
                              <RadioGroup aria-label="gender" row {...field}>
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
               <Typography className="mt-5" variant="h5">選項</Typography>
               <Divider className={classes.divider} />
               <Grid container item spacing={2} xs={12} md={6} lg={4} direction="column">
                  <Grid item container direction="row" alignItems="center" className="mb-3">
                     {data?.user?.role !== Role.Admin && <Grid className="my-3" item container direction="row">
                        <Grid className="mr-5">
                           <Typography variant="h6">帳戶狀態</Typography>
                        </Grid>
                        <Grid>
                           <Switch
                              onChange={() => {
                                 changeAccountStatus({
                                    variables: {
                                       username: data?.user?.username!,
                                       status: checked ? AccountStatus.Suspended : AccountStatus.Active
                                    }
                                 }).then(res => {
                                    setMessage('app.sys.save-success')
                                    setChecked(!checked)
                                    refetch()
                                 })
                                    .catch(err => setErrorModal(err))
                              }}
                              checked={checked}
                              color="primary"
                           />
                        </Grid>
                        <Grid>
                           <Typography color={checked ? "primary" : "secondary"} variant="h5">{checked ? "已啟用" : "已停用"}</Typography>
                        </Grid>
                     </Grid>}
                     <Grid className="mr-5">
                        <Typography color="secondary" variant="h6">重設密碼</Typography>
                     </Grid>
                     <Grid>
                        <Button
                           variant="contained"
                           color={locked ? "default" : "secondary"}
                           type="button"
                           onClick={handleChangePassword}
                        >
                           {locked ? "開始重設" : "完成設定"}
                        </Button>
                     </Grid>
                     {!locked && <Grid className="ml-3">
                        <Button
                           variant="contained"
                           color="default"
                           type="button"
                           onClick={() => {
                              setNewPasswordAdmin(pwdInitState)
                              setPwdConf("")
                              setLocked(true)
                              setpwdErrors({})
                           }}
                        >
                           取消
                  </Button>
                     </Grid>}
                  </Grid>
                  {!locked && <>
                     <Grid item>
                        <TextField
                           error={pwdErrors['admPassword'] != null}
                           size="small"
                           variant="outlined"
                           placeholder="請輸入管理員密碼"
                           label="管理員密碼"
                           type="password"
                           id="admPassword"
                           helperText={pwdErrors['admPassword'] && pwdErrors['admPassword'].error}
                           value={newPasswordAdmin.admPassword}
                           onChange={handleChange}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <VpnKey />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </Grid>
                     <Grid item>
                        <TextField
                           error={pwdErrors['newPassword'] != null}
                           size="small"
                           variant="outlined"
                           placeholder="請輸入新密碼"
                           label="新密碼"
                           type="password"
                           id="newPassword"
                           helperText={pwdErrors['newPassword'] && pwdErrors['newPassword'].error}
                           value={newPasswordAdmin.newPassword}
                           onChange={handleChange}
                        />
                     </Grid>
                     <Grid item>
                        <TextField
                           error={pwdErrors['pwdConf'] != null}
                           size="small"
                           variant="outlined"
                           label="確認新密碼"
                           placeholder="確認新密碼"
                           id="pwdConf"
                           type="password"
                           helperText={pwdErrors['pwdConf'] && pwdErrors['pwdConf'].error}
                           value={pwdConf}
                           onChange={e => setPwdConf(e.target.value)}
                        />
                     </Grid>
                  </>}
               </Grid>
               <Grid className="mt-3" container spacing={2} direction="column">
                  <Grid item>
                     <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!locked}
                     >
                        更新
                        </Button>
                  </Grid>
               </Grid>
            </form>
         </FormProvider>
         }
         {(updateUserLoading || changePasswordLoading || changeStatLoading) && <LinearProgress />}
      </>
   )
}