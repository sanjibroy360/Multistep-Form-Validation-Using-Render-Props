import React, { Component } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { countryOptions } from "../utils/data";
import Select from "../Components/Select";
import Formik from "../Formik/Formik";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";

export default class index extends Component {
  
  render() {
    let { prevStep, nextStep, currentStep, completedStep, setCompletedStep } = this.props;
    
    return (
      <Formik>
        {({
          errors,
          avatarRef,
          values,
          handleImage,
          handleInput,
          handleSubmit,
          isUsernameValid,
          isEmailValid,
          isContactNumberValid,
          isBioValid,
          isAvatarValid,
        }) => (
          <Form>
            <Form.Group widths="equal">
              <InputBox
                name={"firstName"}
                label={"First name"}
                value={values.firstName}
                handleInput={handleInput}
                errorMessage={errors.firstName}
              />
              <InputBox
                name={"lastName"}
                label={"Last name"}
                value={values.lastName}
                handleInput={handleInput}
                errorMessage={errors.lastName}
              />
            </Form.Group>
            <InputBox
              name={"city"}
              label={"City"}
              value={values.city}
              handleInput={handleInput}
              errorMessage={errors.city}
            />
            <InputBox
              name={"district"}
              label={"District"}
              value={values.district}
              handleInput={handleInput}
              errorMessage={errors.district}
            />
            <InputBox
              name={"state"}
              label={"State"}
              value={values.state}
              handleInput={handleInput}
              errorMessage={errors.state}
            />
            <InputBox
              name={"zipcode"}
              label="Zipcode"
              value={values.zipcode}
              handleInput={handleInput}
              errorMessage={errors.zipcode}
            />

            <Select
              label="Country"
              name="country"
              value={values.country}
              errorMessage={errors.country}
              handleInput={handleInput}
              options={countryOptions}
            />

            <TextArea
              name={"address"}
              label={"Address"}
              value={values.address}
              handleInput={handleInput}
              errorMessage={errors.address}
            />
            <div className="btn_wrapper">
              <Button animated onClick={prevStep} size="large" secondary>
                <Button.Content visible>Back</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
              <Button
                animated
                onClick={(event) =>
                  handleSubmit(event, nextStep, currentStep,completedStep, setCompletedStep)
                }
                size="large"
                primary
              >
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
