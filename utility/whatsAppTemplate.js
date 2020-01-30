import _get from "lodash/get";

export const whatsAppTemplates = {
  "d-be60fd9faf074996b23625429aa1dffd": {
    templateLanguage: "english",
    salutation: "Hi",
    message: [
      "Great that you visited",
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
  },
  "d-750571abc0fc4a63ac929d439c24a5bb": {
    templateLanguage: "russian",
    salutation: "Здравствуй",
    message: [
      "Здорово, что вы посетили",
      "Пожалуйста, оставьте отзыв о вашем опыте здесь:"
    ]
  }
};

export const getMessage = (tempId = "", companyName = "") => {
  const templateObj = whatsAppTemplates[tempId] || {};
  const message = _get(templateObj, "message", []);
  return (message[0] || "") + " " + companyName + ". " + (message[1] || "");
};
