import React, { Component } from "react";
import { Button, Form, Icon } from "semantic-ui-react";

import InputBox from "../Components/InputBox";
import Formik from "../Formik/Formik";

export default class index extends Component {
  render() {
    let {
      prevStep,
      currentStep,
      nextStep,
      completedStep,
      setCompletedStep,
    } = this.props;

    return (
      <div>
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
              <InputBox
                name={"school"}
                label={"School"}
                value={values.school}
                handleInput={handleInput}
                errorMessage={errors.school}
              />

              <InputBox
                name={"college"}
                label={"College"}
                value={values.college}
                handleInput={handleInput}
                errorMessage={errors.college}
              />

              <InputBox
                name={"postGraduate"}
                label={"Post-Graduate"}
                value={values.postGraduate}
                handleInput={handleInput}
                errorMessage={errors.postGraduate}
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
                    handleSubmit(
                      event,
                      nextStep,
                      currentStep,
                      completedStep,
                      setCompletedStep
                    )
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
      </div>
    );
  }
}
