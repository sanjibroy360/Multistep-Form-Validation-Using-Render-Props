import { Component, createRef } from "react";

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

        firstName: "",
        lastName: "",
        city: "",
        state: "",
        district: "",
        zipcode: "",
        address: "",
        country: "",

        school: "",
        college: "",
        postGraduate: "",
      },

      values: {
        username: "",
        bio: "",
        email: "",
        contactNumber: "",
        avatar: "",
        previewAvatar: "",

        firstName: "",
        lastName: "",
        city: "",
        state: "",
        district: "",
        zipcode: "",
        address: "",
        country: "",

        completedStep: -1
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
    this.timerId = "";
  }

  //   Handlers

  handleInput = ({ target: { name, value } }) => {
    return this.setState({ values: { ...this.state.values, [name]: value }, errors: {...this.state.errors, [name]: ""} });
  };

  handleImage = () => {
    let file = this.avatarRef.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    this.avatarImageType = this.avatarRef.current.files[0].type;
    reader.onloadend = () => {
      return this.setState({
        values: {
          ...this.state.values,
          previewAvatar: [reader.result],
          avatar: file.name,
        },
        errors: {
          ...this.state.errors,
          avatar: ""
        }
      });
    };
  };

  validateProfileInfo = async () => {
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

  validatePersonalInfo = async () => {
    let {
      firstName,
      lastName,
      state,
      city,
      district,
      country,
    } = this.state.values;
    let isFirstNameValid = await this.isNameValid(
      firstName,
      "firstName",
      "First name"
    );
    let isLastNameValid = await this.isNameValid(
      lastName,
      "firstName",
      "Last name"
    );
    let isCityNameValid = await this.isNonEmpty(city, "city", "City name");
    let isStateNameValid = await this.isNonEmpty(state, "state", "State name");
    let isCountryNameValid = await this.isNonEmpty(
      country,
      "country",
      "Country name"
    );
    let isDistrictNameValid = await this.isNonEmpty(
      district,
      "district",
      "Country name"
    );
    let isZipcodeValid = await this.isZipcodeValid();

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isCityNameValid &&
      isStateNameValid &&
      isCountryNameValid &&
      isDistrictNameValid &&
      isZipcodeValid
    );
  };

  validateQualificatioInfo = async () => {
    let { school, college, postGraduate } = this.state.values;
    let isSchoolNameValid = await this.isNonEmpty(
      school,
      "school",
      "School name"
    );
    let isCollegeNameValid = await this.isNonEmpty(
      college,
      "college",
      "College name"
    );
    let isUniversityNameValid = await this.isNonEmpty(
      postGraduate,
      "postGraduate",
      "University name"
    );
    return isSchoolNameValid && isCollegeNameValid && isUniversityNameValid;
  };

  handleSubmit = async (event, nextStep, currentStep, completedStep, setCompletedStep) => {
    if(this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = "";
    }
    event.persist();
    let isAllDataValid = false;
    switch (currentStep) {
      case 0:
        isAllDataValid = await this.validateProfileInfo();
        break;
      case 1:
        isAllDataValid = await this.validatePersonalInfo();
        break;
      case 2:
        isAllDataValid = await this.validateQualificatioInfo();
        break;
      default:
        break;
    }
    
    if (isAllDataValid) {
      if(this.state.values.completedStep < completedStep || completedStep < 0 ) {
        ++completedStep;
        setCompletedStep(completedStep);
        this.setState({completedStep});
      }
      return nextStep();
    } else {
        this.timerId = setTimeout(() => this.setState({errors: this.emptyErrors}),5000)
    }
  };

  // Validation Methods

  // Profile Info

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
    return true;
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
        errors: {
          ...this.state.errors,
          contactNumber: "Contact number is required.",
        },
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

  // Personal Info

  isNameValid = (name = "", key = "", formatedFieldName) => {
    if (!name) {
      return this.setState({
        errors: {
          ...this.state.errors,
          [key]: `${formatedFieldName.trim()} is required.`,
        },
      });
    }

    let hasNonCharValue = name.split("").some((char, index) => {
      let asciiValue = name.toLowerCase().charCodeAt(index);
      if (asciiValue < 97 || asciiValue > 122 || !isNaN(+char)) {
        return true;
      }
      return false;
    });
    if (hasNonCharValue) {
      return this.setState({
        errors: {
          ...this.state.errors,
          [key]: "Only alphabets are allowed.",
        },
      });
    }
    return true;
  };

  isZipcodeValid = () => {
    let { zipcode } = this.state.values;
    zipcode = zipcode.trim();
    if (!zipcode) return "Zipcode is required.";
    if (zipcode.length !== 6) {
      return "Zipcode must be 6 character long.";
    }

    let hasNonNumericValue = zipcode.split("").some((digit) => isNaN(+digit));

    if (hasNonNumericValue) {
      return "Zipcode sholud contain only numbers.";
    }
    return true;
  };

  // Personal Info & Qualifications

  isNonEmpty = (value = "", key = "", formatedFieldName = "") => {
    value = value.trim();
    if (!value) {
      return this.setState({
        errors: {
          ...this.state.errors,
          [key]: `${formatedFieldName} is required`,
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
