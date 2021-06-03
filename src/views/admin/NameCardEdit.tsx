import { Button, Grid, LinearProgress, makeStyles, Radio, Typography } from "@material-ui/core";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputRadio from "components/Forms/MuiInputRadio";
import MuiInputText from "components/Forms/MuiInputText";
import { AccountStatus, Gender, NameCard, useNameCardQuery } from "generated/graphql";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import useGlobalStyles from "styles/styles";

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

export default function NameCardEdit() {

   const globalClasses = useGlobalStyles()
   const classes = useStyles()

   const { oid } = useParams<any>()

   const { data, loading } = useNameCardQuery({ variables: { oid: oid } })

   const methods = useForm<NameCard>({
      defaultValues: {
         name: '',
         gender: Gender.Male
      }
   })

   const { reset, handleSubmit } = methods

   const [readonly, setReadonly] = useState(false)

   const onSubmit = (data: any) => {
      console.log(data)
   }

   useEffect(() => {
      if (data && reset) {
         reset({
            name: data.nameCard?.name,
            email: data.nameCard?.email,
            phone: data.nameCard?.phone,
            gender: data.nameCard?.gender,
            status: data.nameCard?.status,
            remarks: data.nameCard?.remarks,
            lupdDttm: data.nameCard?.lupdDttm
         })
         if (data?.nameCard?.status && data?.nameCard?.status === AccountStatus.Active) {
            setReadonly(true)
         }
      }
   }, [data, reset])

   return <>
      {loading && <LinearProgress className={classes.progress} />}
      {!loading && <FormProvider {...methods}>
         <RouterBreadcrumbs />
         <Typography className={globalClasses.adminPageTitle} variant="h5">跟進新來賓</Typography>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" spacing={3}>
               <Grid item>
                  <MuiInputText
                     label="姓名"
                     name="name"
                     md={6}
                     lg={4}
                     isReadOnly={true}
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     label="電話"
                     name="phone"
                     md={6}
                     lg={4}
                     isReadOnly={true}
                  />
               </Grid>
               <Grid item>
                  <MuiInputText
                     label="電郵"
                     name="email"
                     md={8}
                     lg={6}
                     isReadOnly={true}
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
                     disabled={true}
                  />
               </Grid>
               <Grid item xs={12}>
                  <MuiInputText
                     name="remarks"
                     label="備註"
                     rows={4}
                     multiline={true}
                     md={8}
                     lg={6}
                     isReadOnly={readonly}
                  />
               </Grid>
               <Grid item>
                  <MuiInputDropdown
                     isReadOnly={readonly}
                     name="status"
                     label="變更跟進情況"
                     xs={12}
                     md={4}
                     ds={[
                        { value: AccountStatus.Contacting, display: "跟進中", disabled: false },
                        { value: AccountStatus.Pending, display: "待接觸", disabled: false },
                        { value: AccountStatus.Inactive, display: "不活躍🚫", disabled: false },
                        { value: AccountStatus.Active, display: "已成為會友✅", disabled: false }
                     ]}
                  />
               </Grid>
               <Grid item>
                  <Button variant="contained" color="primary" type="submit">儲存</Button>
               </Grid>
            </Grid>
         </form>
      </FormProvider>}
   </>
}