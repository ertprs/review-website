const validate = (value, rules) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "required":
        isValid = isValid && isEmpty(value);
        break;
      case "isEmail":
        isValid = isValid && isEmail(value);
        break;
      case "isPhoneNumber":
        isValid = isValid && isPhoneNumber(value);
        break;
      case "isDomain":
        isValid = isValid && isDomain(value);
        break;
      case "minLength":
        isValid = isValid && isMinLength(value, rules[rule]);
        break;
      case "maxLength":
        isValid = isValid && isMaxLength(value, rules[rule]);
        break;
      case "isCountryCode":
        isValid = isValid && isCountryCode(value);
      default:
        isValid = true;
    }
  }
  return isValid;
};

const isEmpty = value => {
  return value.trim().length > 0;
};

const isEmail = value => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );
};

const isPhoneNumber = value => {
  return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value);
};

const isCountryCode = value => {
  return /(\+\d{1-3})|(\d{1,4})/.test(value);
};

const isDomain = value => {
  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
    value
  );
};

const isMinLength = (value, minLength) => {
  return value.length >= minLength;
};

const isMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

export default validate;
