import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import templateIds from "./constants/sendgridTemaplateIds";

const createCampaignLang = locales => {
  let campaignLanguage = [];
  if (!_isEmpty(locales)) {
    let localesArray = [];
    let localesKey = Object.keys(locales);
    localesArray = localesKey.map(key => {
      let temp = {};
      temp.value = key;
      temp.name = locales[key];
      return { ...temp };
    });
    if (!_isEmpty(localesArray) && !_isEmpty(templateIds)) {
      campaignLanguage =
        localesArray &&
        localesArray.map(locales => {
          let template = _filter(templateIds, ["name", locales.value]);
          if (template && template !== undefined) {
            let temp = {};
            temp.name = locales.name;
            temp.value = template[0].value;
            temp.code = locales.value;
            return { ...temp };
          } else return;
        });
    } else return;
  }
  if (!_isEmpty(campaignLanguage) && Array.isArray(campaignLanguage)) {
    return campaignLanguage;
  } else {
    return [
      {
        name: "English",
        value: "d-be60fd9faf074996b23625429aa1dffd",
        code: "en"
      }
    ];
  }
};

export default createCampaignLang;
