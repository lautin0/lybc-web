import { Button, Grid, LinearProgress, Radio, Typography } from "@material-ui/core";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import MuiInputDropdown from "components/Forms/MuiInputDropdown";
import MuiInputRadio from "components/Forms/MuiInputRadio";
import MuiInputText from "components/Forms/MuiInputText";
import { AccountStatus, Gender, NameCard, useNameCardQuery, useUpdateNameCardMutation } from "generated/graphql";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { useModalStore } from "store";
import useGlobalStyles from "styles/styles";

export default function NameCardEdit() {

   const globalClasses = useGlobalStyles()

   const history = useHistory()

   const { oid } = useParams<any>()

   const { data, loading } = useNameCardQuery({ variables: { oid: oid } })
   const [updateNamecard, { loading: updateLoading }] = useUpdateNameCardMutation()

   const methods = useForm<NameCard>({
      defaultValues: {
         name: '',
         gender: Gender.Male
      }
   })

   const { reset, handleSubmit } = methods

   const [readonly, setReadonly] = useState(false)

   const setMessage = useModalStore(state => state.setMessage)
   const setErrorModal = useModalStore(state => state.setError)

   const onSubmit = (d: any) => {
      updateNamecard({
         variables: {
            input: {
               _id: data?.nameCard?._id,
               remarks: d.remarks,
               status: d.status,
            }
         }
      }).then(e => {
         setMessage('app.sys.save-success')
         reset();
         history.push('/admin/namecards')
      }).catch((err: any) => {
         setErrorModal(err)
      })
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
      {(loading || updateLoading) && <LinearProgress className={globalClasses.progress} />}
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
                        { value: AccountStatus.Inactive, display: "擱置🚫", disabled: false },
                        { value: AccountStatus.Active, display: "已成為會友✅", disabled: false }
                     ]}
                  />
               </Grid>
               {!readonly && <Grid item>
                  <Button variant="contained" color="primary" type="submit">儲存</Button>
               </Grid>}
            </Grid>
         </form>
      </FormProvider>}
   </>
}