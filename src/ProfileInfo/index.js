import React, { Component } from "react";
import { Button, Form, Message, Icon } from "semantic-ui-react";
import Formik from "../Formik/Formik";
import {
  isUsernameValid,
  isBioValid,
  isAvatarValid,
  isEmailValid,
  isContactNumberValid,
} from "../utils/validateProfileForm";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";
import Avatar from "../Components/Avatar";

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      bio: "",
      email: "",
      contactNumber: "",
      avatar: "",
      previewAvatar: "",
      avatarImageType: "",

      usernameValidationFailedMessage: "",
      bioValidationFailedMessage: "",
      emailValidationFailedMessage: "",
      avatarValidationFailedMessage: "",
      contactNumberValidationFailedMessage: "",
    };
    this.avatarRef = React.createRef();
  }

  // componentDidMount() {
  //   let {
  //     avatar,
  //     previewAvatar,
  //     username,
  //     bio,
  //     email,
  //     contactNumber,
  //     avatarImageType,
  //   } = this.props;

  //   this.setState({
  //     avatar,
  //     previewAvatar,
  //     username,
  //     bio,
  //     email,
  //     contactNumber,
  //     avatarImageType,
  //   });
  // }

  // handleInput = ({ target: { name, value } }) => {
  //   this.setState({ [name]: value });
  //   return this.removeErrorMessage(name);
  // };

  // handleImage = () => {
  //   let file = this.avatarRef.current.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   this.removeErrorMessage("avatar");
  //   reader.onloadend = () => {
  //     this.setState({
  //       previewAvatar: [reader.result],
  //       avatarImageType: this.avatarRef.current.files[0].type,
  //       avatar: file.name,
  //     });
  //   };
  //   return this.removeErrorMessage("avatar");
  // };

  // removeErrorMessage = (name) => {
  //   let {
  //     usernameValidationFailedMessage,
  //     bioValidationFailedMessage,
  //     emailValidationFailedMessage,
  //     avatarValidationFailedMessage,
  //     contactNumberValidationFailedMessage,
  //   } = this.state;

  //   switch (name) {
  //     case "email":
  //       return (
  //         emailValidationFailedMessage &&
  //         this.setState({ emailValidationFailedMessage: "" })
  //       );

  //     case "bio":
  //       return (
  //         bioValidationFailedMessage &&
  //         this.setState({ bioValidationFailedMessage: "" })
  //       );
  //     case "username":
  //       return (
  //         usernameValidationFailedMessage &&
  //         this.setState({ usernameValidationFailedMessage: "" })
  //       );
  //     case "avatar":
  //       return (
  //         avatarValidationFailedMessage &&
  //         this.setState({ avatarValidationFailedMessage: "" })
  //       );
  //     case "contactNumber":
  //       return (
  //         contactNumberValidationFailedMessage &&
  //         this.setState({ contactNumberValidationFailedMessage: "" })
  //       );
  //     default:
  //       return;
  //   }
  // };

  // validateForm = ({
  //   username,
  //   email,
  //   bio,
  //   contactNumber,
  //   avatar,
  //   avatarImageType,
  // }) => {
  //   let usernameValidationFailedMessage = isUsernameValid(username);
  //   let bioValidationFailedMessage = isBioValid(bio);
  //   let emailValidationFailedMessage = isEmailValid(email);
  //   let avatarValidationFailedMessage = isAvatarValid(avatar, avatarImageType);
  //   let contactNumberValidationFailedMessage = isContactNumberValid(
  //     contactNumber
  //   );
  //   this.setState({
  //     usernameValidationFailedMessage,
  //     bioValidationFailedMessage,
  //     emailValidationFailedMessage,
  //     avatarValidationFailedMessage,
  //     contactNumberValidationFailedMessage,
  //   });
  // };

  // handleSubmit = async (event) => {
  //   event.persist();
  //   let { updateInfo, nextStep } = this.props;
  //   let {
  //     avatar,
  //     previewAvatar,
  //     username,
  //     bio,
  //     email,
  //     contactNumber,
  //     avatarImageType,
  //   } = this.state;
  //   await this.validateForm(this.state);
  //   if (
  //     this.state.usernameValidationFailedMessage ||
  //     this.state.bioValidationFailedMessage ||
  //     this.state.emailValidationFailedMessage ||
  //     this.state.avatarValidationFailedMessage ||
  //     this.state.contactNumberValidationFailedMessage
  //   ) {
  //     return;
  //   }
  //   updateInfo({
  //     avatar,
  //     previewAvatar,
  //     username,
  //     bio,
  //     email,
  //     contactNumber,
  //     avatarImageType,
  //     completedStep: 0,
  //   });
  //   nextStep();
  // };

  render() {
    // let {
    //   avatar,
    //   previewAvatar,
    //   username,
    //   bio,
    //   email,
    //   contactNumber,
    //   usernameValidationFailedMessage,
    //   bioValidationFailedMessage,
    //   emailValidationFailedMessage,
    //   avatarValidationFailedMessage,
    //   contactNumberValidationFailedMessage,
    // } = this.state;
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

              <Avatar previewAvatar={values.previewAvatar} avatar={values.avatar} />
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
                <Button animated onClick={handleSubmit} size="large" primary>
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
