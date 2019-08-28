import React from "react";
import FormField from '../FormField/FormField';

const formFieldStyles = {
    borderRadius:"50px"
}

class ScheduleMeeting extends React.Component {
  state = {
    formData: {
      name: {
        element: "input",
        type: "text",
        value: "",
        placeholder: "Name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "name"
      },
      email: {
        element: "input",
        type: "email",
        value: "",
        placeholder: "Email address",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "email"
      },
      phoneNumber: {
        element: "input",
        type: "text",
        value: "",
        placeholder: "Phone number",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isPhoneNumber: true
        },
        name: "phoneNumber"
      },
      objective: {
        element: "select",
        value: "",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "objective"
      }
    }
  };

  handleInputChange = (e)=>{
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <form>
            <FormField {...this.state.formData.name} id="name" handleChange={this.handleInputChange} styles={{...formFieldStyles}} />
        </form>
      </div>
    );
  }
}

export default ScheduleMeeting;
