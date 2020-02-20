import _isEmpty from "lodash/isEmpty";

const createReqBody = data => {
  let reqBody = {};
  if (!_isEmpty(data)) {
    let ObjectKeysArray = Object.keys(data);
    if (!_isEmpty(ObjectKeysArray) && Array.isArray(ObjectKeysArray)) {
      ObjectKeysArray.map(key => {
        if (data.hasOwnProperty([key])) {
          reqBody[key] = data[key].value;
        }
      });
    }
  }
  return reqBody;
};
export default createReqBody;
