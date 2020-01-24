import React, { Component } from "react";
import dynamic from "next/dynamic";

//Components
const UploadCustomerData = dynamic(
  () => import("./StepComponents/UploadCustomerData"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const ChooseTemplate = dynamic(
  () => import("./StepComponents/ChooseTemplate"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

class WhatsAppInvitation extends Component {
  constructor(props) {
    super(props);
    this.steps = {
      1: <UploadCustomerData />,
      2: <ChooseTemplate />
    };

    //? this will set 1st component to render on load
    let totalSteps = Object.keys(this.steps).length;
    this.state = {
      activeStep: 1,
      totalSteps
    };
  }

  handleNext = stepNo => {
    const { totalSteps } = this.state;
    let activeStep = _get(this.state, "activeStep", 1);
    //? If step no is greater than total no of steps or less than one then we are setting it to 1
    if (stepNo > totalSteps || stepNo < 1) {
      stepNo = 1;
    }
    if (activeStep < totalSteps) {
      activeStep = stepNo ? stepNo : activeStep + 1;
    } else {
      activeStep = activeStep;
    }
    activeStep = stepNo ? stepNo : activeStep + 1;
    this.setState({ activeStep });
  };

  handlePrev = stepNo => {
    const { totalSteps } = this.state;
    let activeStep = _get(this.state, "activeStep", 1);
    //? If step no is greater than total no of steps or less than one then we are setting it to 1
    if (stepNo > totalSteps || stepNo < 1) {
      stepNo = 1;
    }
    //? If we are already at step 1 it will not change
    if (activeStep > 1) {
      activeStep = stepNo ? stepNo : activeStep - 1;
    } else {
      activeStep = activeStep;
    }
    this.setState({ activeStep });
  };

  render() {
    const { activeStep } = this.state;
    return <div>{this.steps[activeStep]}</div>;
  }
}

export default WhatsAppInvitation;
