import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Qualification from "./Qualification/Qualification";
import Steps from "./Components/Steps";
import { Segment } from "semantic-ui-react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      completedStep: -1,
    };
  }

  setCompletedStep = (completedStep) => {
    alert(completedStep);
    this.setState({completedStep})
  }

  nextStep = () => {
    let { currentStep } = this.state;

    if (currentStep < 2 && currentStep >= 0) {
      return this.setState(({ currentStep }) => ({
        currentStep: ++currentStep,
      }));
    }
  };

  prevStep = () => {
    let { currentStep } = this.state;
    let userResponse = window.confirm(
      "Do you really want to go to the previous step?",
      false
    );

    if (currentStep < 3 && currentStep >= 1 && userResponse) {
      return this.setState(({ currentStep }) => ({
        currentStep: --currentStep,
      }));
    }
  };

  jumpToStep = (stepNo) => {
    let { completedStep } = this.state;
    let userResponse = window.confirm(
      "Do you really want to go to the previous step?",
      false
    );
    if (stepNo <= completedStep + 1 && stepNo >= 0 && userResponse) {
      return this.setState({ currentStep: stepNo });
    }
  };

  render() {
    let { currentStep, completedStep } = this.state;
    let forms = [
      () => (
        <ProfileInfo
          currentStep={currentStep}
          completedStep={completedStep}
          nextStep={this.nextStep}
          setCompletedStep={this.setCompletedStep}
        />
      ),
      () => (
        <PersonalInfo
          currentStep={currentStep}
          completedStep={completedStep}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          setCompletedStep={this.setCompletedStep}
        />
      ),
      () => (
        <Qualification
          currentStep={currentStep}
          completedStep={completedStep}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          setCompletedStep={this.setCompletedStep}
        />
      ),
    ];
    let Form = forms[currentStep];
    return (
      <div className="container">
        <Steps
          currentStep={currentStep}
          completedStep={completedStep}
          jumpToStep={this.jumpToStep}
        />
        <Segment className="form_segment">
          <div className="form_wrapper">
            <Form />
          </div>
        </Segment>
      </div>
    );
  }
}
