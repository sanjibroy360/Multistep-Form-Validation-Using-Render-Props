import React, { Component, createRef } from "react";

export default class Formik extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        username: "",
        bio: "",
        email: "",
        contactNumber: "",
        avatar: "",
      },

      values: {
        username: "",
        bio: "",
        email: "",
        contactNumber: "",
        avatar: "",
        previewAvatar: "",
      },
    };
    this.avatarRef = createRef();
    this.emptyErrors = {
      username: "",
      bio: "",
      email: "",
      contactNumber: "",
      avatar: "",
    };
  }

  //   Handlers
  handleInput = ({ target: { name, value } }) => {
    return this.setState({ values: { ...this.state.values, [name]: value } });
    
  };

  handleImage = () => {
    let file = this.avatarRef.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    
    this.avatarImageType = this.avatarRef.current.files[0].type;
    reader.onloadend = () => {
      return this.setState({
        values: { previewAvatar: [reader.result], avatar: file.name },
      });
    };
    
  };

  validate = async () => {
    let isUsernameValid = await this.isUsernameValid();
    let isBioValid = await this.isBioValid();
    let isEmailValid = await this.isEmailValid();
    let isContactNumberValid = await this.isContactNumberValid();
    let isAvatarValid = await this.isAvatarValid();
    return (
      isUsernameValid &&
      isBioValid &&
      isEmailValid &&
      isContactNumberValid &&
      isAvatarValid
    );
  };
  handleSubmit = async (event) => {
    console.log(event);
    event.persist();
    let isAllDataValid = await this.validate();
    return isAllDataValid;
  };

  //   Validation Methods

  isUsernameValid = () => {
    let { username } = this.state.values;
    username = username.trim();
    if (!username) {
      this.setState({
        errors: { ...this.state.errors, username: "Username is required." },
      });
    }
    let hasNumber = username.split("").some((char) => !isNaN(+char));
    if (username.length < 6) {
      return this.setState({
        errors: {
          ...this.state.errors,
          username: "Username must be atleast 6 character long.",
        },
      });
    } else if (username !== username.toLowerCase()) {
      return this.setState({
        errors: {
          ...this.state.errors,
          username: "Username must be in lowercase.",
        },
      });
    } else if (hasNumber) {
      return this.setState({
        errors: {
          ...this.state.errors,
          username: "Username should not contain any digit",
        },
      });
    } else {
      return true;
    }
  };

  isBioValid = () => {
    let { bio } = this.state.values;
    bio = bio.trim();
    if (!bio) {
      return this.setState({
        errors: { ...this.state.errors, bio: "Bio is required." },
      });
    }

    if (bio.length < 150) {
      return this.setState({
        errors: {
          ...this.state.errors,
          bio: "Bio must be 150 characters long",
        },
      });
    }

    return true;
  };

  isAvatarValid = () => {
    let { avatar } = this.state.values;
    avatar = avatar.trim();
    if (!avatar)
      return this.setState({
        errors: {
          ...this.state.errors,
          avatar: "Profile picture is required.",
        },
      });
    let isJPEG = this.avatarImageType.toLowerCase().includes("jpeg");
    if (!isJPEG) {
      return this.setState({
        errors: {
          ...this.state.errors,
          avatar: "Only .jpeg images are supported.",
        },
      });
    }
  };

  isEmailValid = () => {
    let { email } = this.state.values;
    email = email.trim();
    if (!email) {
      return this.setState({
        errors: { ...this.state.errors, email: "Email is required." },
      });
    }
    let isValid = email.length && email.endsWith(".com") && email.includes("@");
    if (!isValid) {
      return this.setState({
        errors: { ...this.state.errors, email: "Invalid Email" },
      });
    }
    return true;
  };

  isContactNumberValid = () => {
    let { contactNumber } = this.state.values;
    let hasNonNumericValue = contactNumber
      .split("")
      .some((digit) => isNaN(+digit));
    contactNumber = contactNumber.trim();
    if (!contactNumber) {
      return this.setState({
        errors: { ...this.state.errors, contactNumber: "Contact number is required." },
      });
    }

    let startingDigit = contactNumber.trim().slice(0, 1);
    if (startingDigit > 9 || startingDigit < 6) {
      return this.setState({
        errors: {
          ...this.state.errors,
          contactNumber: "Invalid contact number.",
        },
      });
    }

    if (hasNonNumericValue) {
      return this.setState({
        errors: {
          ...this.state.errors,
          contactNumber:
            "Contact number should not contain any non numeric value",
        },
      });
    }
    return true;
  };

  render() {
    let { children } = this.props;
    let { errors, values } = this.state;
    let {
      avatarRef,
      handleImage,
      handleInput,
      handleSubmit,
      isUsernameValid,
      isEmailValid,
      isContactNumberValid,
      isBioValid,
      isAvatarValid,
    } = this;

    let requiredData = {
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
    };

    return children(requiredData);
  }
}
