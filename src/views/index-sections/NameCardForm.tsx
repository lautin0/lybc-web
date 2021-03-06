import { useEffect, useState } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Gender, NameCard, useCreateNameCardMutation } from "generated/graphql";
import Validators from "utils/validator";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { RootStore } from "store";
import shallow from "zustand/shallow";

// core components

export default function NameCardForm() {

  const intl = useIntl()

  const location = useLocation()

  const { setLoading } = RootStore.useLoadingStore()
  const [setSysMessage, setSysFailure] = RootStore.useModalStore(state => [state.setSysMessage, state.setSysFailure], shallow)

  const [nameFocus, setNameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [addNameCard] = useCreateNameCardMutation()

  const methods = useForm<NameCard>({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const { handleSubmit, reset, getValues, control, formState: { errors }, register } = methods

  const onSubmit = (data: any) => {
    setLoading(true)
    addNameCard({
      variables: {
        input: {
          name: data.name,
          email: data.email.length > 0 ? data.email : null,
          gender: data.gender.length > 0 ? data.gender : null,
          phone: data.phone.length > 0 ? data.phone : null
        },
      }
    }).then(res => {
      setSysMessage('app.sys.thanks-for-church-interest')
      reset();
    })
      .catch((err: any) => {
        setSysFailure(err)
        reset();
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    reset && reset();
  }, [location, reset])

  return (
    <>
      <div className="new-comer-section"></div>
      <div className="d-flex flex-wrap" style={{ marginTop: 100 }}>
        <div className="flex-fill my-auto text-center col-lg-6 col-md-12" style={{ zIndex: 1 }}>
          <h2 className="pt-5 name-card-title">{intl.formatMessage({ id: "app.namecard.title" })}</h2>
        </div>
        <div className="flex-fill mt-5 mb-5 col-lg-6 col-md-12">
          <Container>
            <Row>
              <Card className="col-sm-12 col-md-12 col-lg-10 p-3 m-2" style={{ borderRadius: '0.7rem' }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Card.Header className="text-left">
                    <h3 className="title-up description">
                      {intl.formatMessage({ id: "app.namecard.subtitle" })}
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <InputGroup
                      className={
                        "no-border" + (nameFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        {intl.formatMessage({ id: "app.forms.name" })}
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...register("name", { validate: Validators.NoWhiteSpace })}
                        style={{ maxWidth: 300 }}
                        placeholder={intl.formatMessage({ id: "app.forms.placeholder.name" })}
                        type="text"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => { setNameFocus(false); }}
                      ></FormControl>
                    </InputGroup>
                    {errors.name && <label style={{ opacity: .6, color: 'red' }}>{intl.formatMessage({ id: "app.validation.required" })}</label>}
                    <InputGroup
                      className={
                        "no-border" + (phoneFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        {intl.formatMessage({ id: "app.forms.phone" })}
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons tech_mobile"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...register("phone", { validate: Validators.NoWhiteSpaceForWhiteSpace(getValues("email")) })}
                        style={{ maxWidth: 300 }}
                        placeholder={intl.formatMessage({ id: "app.forms.placeholder.phone" })}
                        type="text"
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => { setPhoneFocus(false); }}
                      ></FormControl>
                    </InputGroup>
                    {errors.phone && <label style={{ opacity: .6, color: 'red' }}>{intl.formatMessage({ id: "app.validation.either-required-contact" })}</label>}
                    <InputGroup
                      className={
                        "no-border" + (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        {intl.formatMessage({ id: "app.forms.email" })}
                      </label>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        {...register("email", { validate: Validators.NoWhiteSpaceForWhiteSpace(getValues("phone")) })}
                        style={{ maxWidth: 400 }}
                        placeholder={intl.formatMessage({ id: "app.forms.placeholder.email" })}
                        type="text"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => { setEmailFocus(false); }}
                      ></FormControl>
                    </InputGroup>
                    {errors.email && <label style={{ opacity: .6, color: 'red' }}>{intl.formatMessage({ id: "app.validation.either-required-contact" })}</label>}
                    <InputGroup>
                      <label className="col-sm-4 col-md-2 col-form-label p-2">
                        {intl.formatMessage({ id: "app.forms.gender" })}
                      </label>
                      <div className="d-flex justify-content-start" style={{ marginTop: -5 }}>
                        <Controller
                          render={({ field, fieldState }) => <Form.Check
                            {...field}
                            value={Gender.Male}
                            className="form-check-radio mx-2"
                            type="radio"
                            id="rbM"
                            // checked={Gender.Male.toString() === getValues().gender}
                            name="rbGender"
                            label={<><span className="form-check-sign"></span>{intl.formatMessage({ id: "app.forms.gender.male" })}</>}
                          ></Form.Check>
                          }
                          control={control}
                          name="gender"
                        />
                        <Controller
                          render={({ field, fieldState }) => <Form.Check
                            {...field}
                            value={Gender.Female}
                            className="form-check-radio mx-2"
                            type="radio"
                            id="rbF"
                            // checked={Gender.Female.toString() === getValues().gender}
                            name="rbGender"
                            label={<><span className="form-check-sign"></span>{intl.formatMessage({ id: "app.forms.gender.female" })}</>}
                          ></Form.Check>}
                          control={control}
                          name="gender"
                        />
                      </div>
                    </InputGroup>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      className="btn-info btn-round"
                      // href="#pablo"
                      // onClick={() => dispatch(saveNewComer(person))}
                      type="submit"
                      size="lg"
                    >
                      {intl.formatMessage({ id: "app.buttons.submit" })}
                    </Button>
                  </Card.Footer>
                </Form>
              </Card>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}