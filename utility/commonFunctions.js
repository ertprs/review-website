import { isEmpty, get } from "lodash";
import moment from "moment";
import "moment-timezone";
import FormField from "../Components/Widgets/FormField/FormField";

//? We can use this method to check if the form is valid or not, you just need to send the formdata object, it will loop through the object and will return true if all the fields are valid.
export const isFormValid = formDataObject => {
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

//! This method can be used to render form fields if you pass form data object make sure to import <FormField />

export const renderFormFields = (formData, handleFormDataChange) => {
  let output = [];
  if (Object.keys(formData).length > 0 && handleFormDataChange) {
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
              handleChange={handleFormDataChange}
            />
          </div>
        </div>
      ];
    }
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

//remove https || http || www from domain names
export const removeSubDomain = domain => {
  let parsed_domain_name = domain.replace(/http:\/\/|https:\/\/|www\./gim, "");
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
    } else if (currentHour === selectedHour) {
      if (currentMinute >= selectedMinutes) {
        valid = false;
      } else if (selectedMinutes - currentMinute < 15) {
        valid = false;
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

export const calTotalReviewsAndRating = reviews => {
  let totalReviews = 0;
  let totalRating = 0;
  let noOfPlatforms = 0;
  for (let platform in reviews) {
    let platformObj = reviews[platform];
    for (let place in platformObj) {
      let placeObj = platformObj[place];
      totalReviews += get(placeObj, "data.data.tsTotal", 0);
      let rating = get(placeObj, "data.data.tsRating", 0);
      if (rating) {
        totalRating += Number(rating);
        noOfPlatforms++;
      }
    }
  }
  let overallRating = (totalRating / (noOfPlatforms || 1)).toFixed(1);
  return {
    totalReviews,
    overallRating
  };
};

//How to convert utc date to timezone
//! props: {
//!  * dateTime: date-time which we want to convert, should be in UTC 24 hour string
//!   timezone: could be any of moment timezone(from moment.json file), if not provided it will use moment.local to convert according to system timezone
//!  utcFormat: your utc string dateTime format
//!   displayFormat: the format in which you want to display date time
//! }
export const utcToTimezone = (dateTime, timezone, UtcFormat, displayFormat) => {
  if (dateTime) {
    let convertedDateTime = null;
    const defaultUtcFormat = "YYYY-MM-DD HH:mm:ss";
    const defaultDisplayFormat = "DD/MM/YYYY HH:mm:ss";
    let newUTCFormat = UtcFormat ? UtcFormat : defaultUtcFormat;
    let newDisplayFormat = displayFormat ? displayFormat : defaultDisplayFormat;
    if (timezone) {
      convertedDateTime = moment
        .utc(dateTime, newUTCFormat)
        .clone()
        .tz(timezone)
        .format(newDisplayFormat);
    } else {
      convertedDateTime = moment
        .utc(dateTime, newUTCFormat)
        .clone()
        .local()
        .format(newDisplayFormat);
    }
    return convertedDateTime;
  } else {
    return "N/A";
  }
};

//The date can be date-time and should be in string
export const convertToTimeStamp = date => {
  let timestamp = 0;
  if (date) {
    timestamp = Date.parse(date) / 1000;
  }
  return timestamp;
};

//? screenshot layer: copied here to use in future
// const screenshotLayer = `https://api.screenshotlayer.com/api/capture?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=https://www.${parsed_domain_name}&viewport=1440x900&width=250&random=${Math.floor(
//       Math.random() * 10 + 1
//     )}`;

//? to show top three reviews on home/dashboard. copied for future use
// renderReviewSnippets = topThreeReviews => {
//   return topThreeReviews.map(item => {
//     let reviewText = "";
//     if (item.hasOwnProperty("text")) {
//       if (item.text) {
//         if (item.text.length > 26) {
//           reviewText = _get(item, "text", "").substring(0, 26) + "...";
//         } else {
//           reviewText = _get(item, "text", "");
//         }
//       }
//     }
//     return (
//       <div className="reviewSnippetContainer">
//         <style jsx>
//           {`
//             .reviewSnippetContainer {
//               margin-bottom: 25px;
//             }
//             .reviewBody {
//               display: flex;
//               justify-content: space-between;
//             }
//             .reviewBodyText {
//               margin-top: 1.5px;
//               color: #999;
//               font-size: 0.8rem;
//             }
//           `}
//         </style>
//         <div className="reviewText">{reviewText}</div>
//         <div className="reviewBody">
//           <div>
//             <StarRatings
//               rating={Number(item.rating)}
//               starRatedColor={
//                 ratingColor[Math.round(Number(item.rating)) || 0]
//               }
//               starDimension="17px"
//               starSpacing="0.5px"
//               numberOfStars={5}
//               name="rating"
//             />
//           </div>
//           <div className="reviewBodyText">{item.name}</div>
//         </div>
//       </div>
//     );
//   });
// };
