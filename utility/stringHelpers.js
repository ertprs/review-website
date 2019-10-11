import months from "./months.json";

const stringHelpers = (method, value) => {
  switch (method) {
    case "shortenMonths":
      return shortenMonths(value);
    case "getTimeGreeting": return getTimeGreeting()
    default:
      return null;
  }
};

const shortenMonths = value => {
  const month = value
    .substring(value.indexOf(" "), value.lastIndexOf(" "))
    .trim();
  const date = new Date(value.trim());
  return month.length <= 4
    ? value
    : date.getDate() +
        " " +
        months[month].abbreviation +
        " " +
        date.getFullYear();
};

const getTimeGreeting = () => {
  let today = new Date();
  let curHr = today.getHours();
  let msg = "";
  if (curHr < 12) {
    msg = "good morning";
  } else if (curHr < 18) {
    msg = "good afternoon";
  } else {
    msg = "good evening";
  }
  return msg;
};

export default stringHelpers;
