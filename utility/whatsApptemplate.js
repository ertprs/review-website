import _get from "lodash/get";

export const whatsAppTemplates = {
  "d-be60fd9faf074996b23625429aa1dffd": {
    templateLanguage: "english",
    salutation: "Hi",
    message: [
      "Great that you visited ",
      "Please leave a review about your experience here:"
    ]
  },
  "d-0284b5f8859c4e86abb377c503f7e55b": {
    templateLanguage: "latvian",
    salutation: "Sveiki",
    message: [
      "Lieliski, ka jūs apmeklējāt",
      "Lūdzu, atstājiet pārskatu par savu pieredzi šeit:"
    ]
  },
  "d-e73ffb22e7424626ade09f4daf7de400": {
    templateLanguage: "german",
    salutation: "Hallo",
    message: [
      "Schön, dass Sie uns besucht haben",
      "Bitte hinterlassen Sie hier eine Bewertung zu Ihren Erfahrungen:"
    ]
  }
};

export const getWhatsAppTemplateData = (
  tempId = "",
  key = "",
  entityDomain = ""
) => {
  const selectedTemplate = emailTemplates[tempId] || {};
  const templateLanguage = _get(selectedTemplate, "templateLanguage", "");
  if (key === "exampleText") {
    const exampleText = _get(selectedTemplate, "exampleText", []);
    return (
      (exampleText[0] || "") +
      " " +
      (entityDomain || "") +
      " " +
      (exampleText[1] || "")
    );
  } else if (key === "leaveReviewText") {
    const leaveReviewText = _get(selectedTemplate, "leaveReviewText", "");
    return leaveReviewText;
  }
};
