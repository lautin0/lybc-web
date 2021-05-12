import { Button, Divider, FormControlLabel, Grid, InputAdornment, makeStyles, Radio, RadioGroup, Typography } from "@material-ui/core";
import { AccountCircle, VpnKey } from "@material-ui/icons";
import { setLoading } from "actions";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputText from "components/Forms/MuiInputText";
import { Gender, NewUser, Role, useCreateUserMutation, User } from "generated/graphql";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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

export default function UserCreate() {

   const classes = useStyles()

   const dispatch = useDispatch()

   const history = useHistory()
   const location = useLocation()

   const [date, setDate] = useState<Moment>()

   const setMessage = useModalStore(state => state.setMessage)
   const setErrorModal = useModalStore(state => state.setError)

   const [checked, setChecked] = useState(false)

   const [createUser] = useCreateUserMutation()

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
      dispatch(setLoading(true))

      let tmp: NewUser = {
         username: formData.username!,
         role: formData.role!,
         name: formData.name,
         nameC: formData.nameC,
         title: formData.title,
         titleC: formData.titleC,
         // dob: date,
         gender: formData.gender,
         email: formData.email == null || formData.email.length == 0 ? null : formData.email,
         phone: formData.phone == null || formData.phone.length == 0 ? null : formData.phone,
         password: formData.password,
         creBy: moment().format('yyyy-MM-DDTHH:mm:ss-SSSS')
      }

      createUser({
         variables: {
            input: {
               ...tmp
            },
         }
      }).then(res => {
         setMessage('app.sys.save-success')
         dispatch(setLoading(false))
         reset();
         history.push('/admin/users')
      }).catch((err: any) => {
         dispatch(setLoading(false))
         setErrorModal(err)
      })
   }

   return <FormProvider {...methods}>
      <Typography className="my-3" variant="h4">建立新會員</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
         <Grid container direction="row">
            <Grid container item xs={12} md={6} lg={4} direction="column" spacing={2}>
               <Grid item xs={12} md={10}>
                  <Typography variant="h6">系統資料</Typography>
                  <Divider />
               </Grid>
               <Grid item>
                  <MuiInputText
                     name="username"
                     label="用戶名稱"
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
   </FormProvider >
}