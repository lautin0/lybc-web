import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
import { setLoading } from "actions";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputText from "components/Forms/MuiInputText";
import { Gender, Role, User, useUserQuery } from "generated/graphql";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserEdit() {

   const dispatch = useDispatch()

   const { username } = useParams<any>()

   const { loading, data } = useUserQuery({ variables: { username: username }, notifyOnNetworkStatusChange: true })

   const methods = useForm<User>({
      defaultValues: {
         username: "",
         phone: "",
         email: "",
         name: "",
         nameC: ""         
      }
   })

   const { handleSubmit, control, reset } = methods

   const onSubmit = (data: any) => {

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
         })
      }
   }, [data])

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
         <Grid container spacing={2} direction="column">
            <Grid item>
               <MuiInputText
                  name="username"
                  label="用戶編號"
                  md={6}
                  lg={4}
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
                           control={<Radio />}
                           label="男" />
                        <FormControlLabel
                           value={Gender.Female.toString()}
                           control={<Radio />}
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
                  md={6}
                  lg={4}
                  size="small"
               />
            </Grid>
            <Grid item>
               <MuiInputText
                  name="name"
                  label="英文名稱"
                  md={6}
                  lg={4}
                  size="small"
               />
            </Grid>
            <Grid item>
               <MuiInputText
                  name="phone"
                  label="聯絡電話"
                  md={6}
                  lg={4}
                  size="small"
               />
            </Grid>
            <Grid item>
               <MuiInputText
                  name="email"
                  label="電郵地址"
                  md={6}
                  lg={4}
                  xs={12}
                  size="small"
               />
            </Grid>
            <Grid item>
               <MuiInputDropdown
                  name="role"
                  label="角色"
                  md={6}
                  lg={4}
                  xs={12}
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
   </FormProvider>
}