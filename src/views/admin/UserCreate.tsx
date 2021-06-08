import { Button, Divider, Grid, InputAdornment, LinearProgress, Radio, Typography } from "@material-ui/core";
import { AccountCircle, VpnKey } from "@material-ui/icons";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputRadio from "components/Forms/MuiInputRadio";
import MuiInputText from "components/Forms/MuiInputText";
import AuthContext from "context/AuthContext";
import { AccountStatus, Gender, NewUser, Role, useCreateUserMutation, User } from "generated/graphql";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { RootStore } from "store";
import useGlobalStyles from "styles/styles";
import { getTokenValue } from "utils/utils";
import Validators from "utils/validator";
import shallow from "zustand/shallow";

export default function UserCreate() {

   const globalClasses = useGlobalStyles()

   const history = useHistory()

   const [setMessage, { setError: setModalError }] = RootStore.useMuiModalStore(state => [state.setMessage, { setError: state.setError }], shallow)

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

   const { handleSubmit, reset, setError } = methods

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
      }).then(() => {
         setMessage('app.sys.save-success')
         reset();
         history.push('/admin/users')
      }).catch(setModalError)
   }

   return (
      <>
         {loading && <LinearProgress className={globalClasses.progress} />}
         <FormProvider {...methods}>
            <RouterBreadcrumbs />
            <Typography className={globalClasses.adminPageTitle} variant="h5">建立新會員</Typography>
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
                     <MuiInputRadio
                        name="gender"
                        itemList={[
                           { value: Gender.Male, control: <Radio />, label: "男" },
                           { value: Gender.Female, control: <Radio />, label: "女" }
                        ]}
                        label="性別"
                        required={true}
                     />
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