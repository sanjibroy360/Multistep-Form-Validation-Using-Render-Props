import React, { Component } from "react";
import { Button, Form, Message, Icon } from "semantic-ui-react";
import Formik from "../Formik/Formik";

import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";
import Avatar from "../Components/Avatar";

export default class ProfileInfo extends Component {
  render() {
    let { nextStep, currentStep, completedStep, setCompletedStep } = this.props;
    return (
      <div className="form">
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
              <input
                type="file"
                id="upload_avatar"
                ref={avatarRef}
                onChange={handleImage}
                name="avatar"
              />

              <Avatar
                previewAvatar={values.previewAvatar}
                avatar={values.avatar}
              />
              <div>
                {errors.avatar && (
                  <Message negative>
                    <p>{errors.avatar}</p>
                  </Message>
                )}
              </div>

              <InputBox
                name={"username"}
                label={"Username"}
                value={values.username}
                handleInput={handleInput}
                errorMessage={errors.username}
              />

              <TextArea
                name={"bio"}
                label={"Bio"}
                value={values.bio}
                handleInput={handleInput}
                errorMessage={errors.bio}
              />

              <InputBox
                name={"email"}
                label={"Email"}
                value={values.email}
                handleInput={handleInput}
                errorMessage={errors.email}
              />

              <InputBox
                name={"contactNumber"}
                label={"Contact Number"}
                value={values.contactNumber}
                handleInput={handleInput}
                errorMessage={errors.contactNumber}
              />

              <div className="btn_wrapper">
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
      </div>
    );
  }
}
