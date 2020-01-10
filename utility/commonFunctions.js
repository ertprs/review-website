import { isEmpty } from "lodash";

//? We can use this method to check if the form is valid or not, you just need to send the formdata object, it will loop through the object and will return true if all the fields are valid.

const isFormValid = formDataObject => {
  let valid = true;
  for (let item in formDataObject) {
    valid = valid && formDataObject[item].valid;
  }
  return valid;
};

//! We can use these methods to set the value of forms in state on onChange event.

// If you have no nesting inside formdata you may use this method.

// const handleFormDataChange = (e, id) => {
//   const { formData } = this.state;
//   const { value } = e.target;
//   this.setState({
//     formData: {
//       ...formData,
//       [id]: {
//         ...formData[id],
//         value: value,
//         touched: true,
//         valid: validate(value, specificFormData[id].validationRules)
//       }
//     }
//   });
// };

//If you have separate keys inside formData for eg: formData: {woocoomerce: {}} then you can use this one, you need to pass your key name as third argument.

// const handleFormDataChange = (e, id, formData, formName) => {
//   const { value } = e.target;
//   const specificFormData = formData[formName];
//   this.setState({
//     formData: {
//       ...formData,
//       [formName]: {
//         ...specificFormData,
//         [id]: {
//           ...specificFormData[id],
//           value: value,
//           touched: true,
//           valid: validate(value, specificFormData[id].validationRules)
//         }
//       }
//     }
//   });
// };

//! This method can be ysed to render form fields if you pass form data object make sure to import <FormField />

const renderFormFields = (formData, handleFormDataChange) => {
  let output = [];
  for (let item in formData) {
    output = [
      ...output,
      <div>
        <style jsx>
          {`
            .label {
              font-weight: bold;
              margin-bottom: 5px;
              font-size: 15px;
            }
          `}
        </style>
        <div className="form-group">
          <div className="label">
            <label>{formData[item].labelText}</label>
          </div>
          <FormField
            {...formData[item]}
            handleChange={(e, id) => {
              handleFormDataChange(e, id);
            }}
            styles={{
              height: "38px"
            }}
          />
        </div>
      </div>
    ];
  }
  return output;
};

export const areFieldsTouched = formData => {
  let touched = false;
  for (let formField in formData) {
    touched = touched || formData[formField].touched;
  }
  return touched;
};

//remove https and www from domain names
export const removeSubDomain = domain => {
  let parsed_domain_name = domain.replace(/https:\/\//gim, "");
  parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
  return parsed_domain_name;
};

export const isFifteenMinuteDiff = date => {
  const selectedHour = new Date(date).getHours();
  const selectedMinutes = new Date(date).getMinutes();
  const selectedDay = new Date(date).getDate();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentDay = new Date().getDate();
  let valid = true;
  if (selectedDay === currentDay) {
    if (currentHour > selectedHour) {
      valid = false;
      console.log("current hour is greater than selected hour");
    } else if (currentHour === selectedHour) {
      if (currentMinute >= selectedMinutes) {
        valid = false;
        console.log("current minute is greater than selected minutes");
      } else if (selectedMinutes - currentMinute < 15) {
        valid = false;
        console.log("selected minutes diff < 15");
      }
    }
  }
  if (date === null) {
    valid = false;
  }
  return valid;
};

export const isValidArray = arr => {
  let isValid = false;
  if (arr && Array.isArray(arr) && !isEmpty(arr)) {
    isValid = true;
  }
  return isValid;
};
