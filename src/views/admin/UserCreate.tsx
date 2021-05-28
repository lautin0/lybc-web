import { Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, LinearProgress, makeStyles, Radio, RadioGroup, Typography } from "@material-ui/core";
import { AccountCircle, VpnKey } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputText from "components/Forms/MuiInputText";
import AuthContext from "context/AuthContext";
import { AccountStatus, Gender, NewUser, Role, useCreateUserMutation, User } from "generated/graphql";
import React, { useContext } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useModalStore } from "store";
import { getTokenValue } from "utils/utils";
import Validators from "utils/validator";

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

export default function UserCreate() {

   const classes = useStyles()

   const history = useHistory()

   const setMessage = useModalStore(state => state.setMessage)
   const setErrorModal = useModalStore(state => state.setError)

   const [createUser, { loading }] = useCreateUserMutation()

   const { tokenPair } = useContext(AuthContext)

   const methods = useForm<User & { passwordConf: string }>({
      defaultValues: {
         username: "",
         phone: "",
         email: "",
         name: "",
         nameC: "",
         gender: Gender.Male
      }
   })

   const { handleSubmit, control, reset, setError, formState: { errors } } = methods

   const onSubmit = (formData: any) => {

      if (formData.password !== formData.passwordConf) {
         setError('password', {
            type: 'manual',
            message: "輸入的密碼不一致"
         });
         setError('passwordConf', {
            type: "manual",
            message: "輸入的密碼不一致"
         });
         return
      }

      if (!formData.gender) {
         setError('gender', {
            type: 'manual',
            message: "請選擇"
         })
         return
      }

      let tmp: NewUser = {
         username: formData.username,
         role: formData.role,
         name: formData.name,
         nameC: formData.nameC,
         title: formData.title,
         titleC: formData.titleC,
         // dob: date,
         gender: formData.gender,
         email: !formData.email || formData.email.length === 0 ? null : formData.email,
         phone: !formData.phone || formData.phone.length === 0 ? null : formData.phone,
         password: formData.password,
         status: AccountStatus.Active,
         creBy: getTokenValue(tokenPair?.token).username
      }

      createUser({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(res => {
         setMessage('app.sys.save-success')
         reset();
         history.push('/admin/users')
      }).catch((err: any) => {
         setErrorModal(err)
      })
   }

   return (
      <>
         {loading && <LinearProgress className={classes.progress} />}
         <FormProvider {...methods}>
            <RouterBreadcrumbs />
            <Typography className="my-3" variant="h5">建立新會員</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container item xs={12} md={6} lg={4} direction="column" spacing={2}>
                  <Grid item xs={12} md={10}>
                     <Typography variant="h6">系統資料</Typography>
                     <Divider />
                  </Grid>
                  <Grid item>
                     <MuiInputText
                        name="username"
                        label="用戶名稱"
                        validateFn={Validators.NoWhiteSpace}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">
                                 <AccountCircle />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid item>
                     <MuiInputText
                        name="password"
                        type="password"
                        label="密碼"
                        validateFn={Validators.NoWhiteSpace}
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
                     <MuiInputText
                        name="passwordConf"
                        label="確認密碼"
                        type="password"
                        validateFn={Validators.NoWhiteSpace}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">
                                 <VpnKey />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} md={10}>
                     <Typography variant="h6">個人資料</Typography>
                     <Divider />
                  </Grid>
                  <Grid item>
                     <MuiInputText
                        name="nameC"
                        label="中文名稱"
                        validateFn={Validators.NoWhiteSpace}
                        size="small"
                     />
                  </Grid>
                  <Grid item>
                     <MuiInputText
                        name="name"
                        label="英文名稱"
                        validateFn={Validators.NoWhiteSpace}
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
                  <Grid item>
                     <FormControl component="fieldset" error={errors["gender"] != null}>
                        <FormLabel component="legend">性別</FormLabel>
                        {errors["gender"] != null && <FormHelperText>{errors["gender"].message}</FormHelperText>}
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
                        />
                     </FormControl>
                  </Grid>
                  <Grid item>
                     <MuiInputDropdown
                        name="role"
                        label="角色"
                        validateFn={Validators.NoWhiteSpace}
                        ds={[
                           { value: Role.Admin, display: "管理員👑", disabled: false },
                           { value: Role.Worker, display: "同工", disabled: false },
                           { value: Role.Member, display: "會友", disabled: false },
                           { value: Role.Public, display: "公共帳號", disabled: false }
                        ]}
                     />
                  </Grid>
               </Grid>
               <Grid className="mt-3" container spacing={2} direction="column">
                  <Grid item>
                     <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                     >
                        建立
               </Button>
                  </Grid>
               </Grid>
            </form>
         </FormProvider>
      </>
   )
}