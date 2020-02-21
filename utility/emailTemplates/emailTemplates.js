import _get from "lodash/get";

export const emailTemplates = {
  "d-be60fd9faf074996b23625429aa1dffd": {
    templateLanguage: "english",
    subject: "Leave a Review",
    salutation: "Dear",
    message: [
      "Since you recently used",
      "we would like to ask you to leave an honest review. Please leave a review HERE:"
    ],
    regards: ["Best regards,", "On behalf of ", "The TrustSearch team"],
    footer:
      "P.S. TrustSearch is a neutral review gathering partner that provides the anonymity and security you need to leave a fair review. By leaving a review, you agree to the Privacy Policy at this link."
  },
  "d-0284b5f8859c4e86abb377c503f7e55b": {
    templateLanguage: "latvian",
    subject: "Atstājiet pārskatu",
    salutation: "Cien.",
    message: [
      "Tā kā pirms neilga laika Jūs izmantojāt",
      "mēs vēlētos Jums lūgt atstāt atklātu atsauksmi par mūsu.Lūdzu atstājiet atsaksmi ŠEIT:"
    ],
    regards: ["Ar cieņu,", " vārdā", "TrustSearch komanda"],
    footer:
      "P.S. TrustSearch ir neitrāls atsauksmju ievākšanas partneris, kas nodrošina anonimitāti un drošību, kas jums nepieciešama, lai atstātu godīgu atsauksmi. Atstājot atsauksmi, jūs piekrītat šajā linkā pieejamajā Privātuma politikai."
  },
  "d-e73ffb22e7424626ade09f4daf7de400": {
    templateLanguage: "german",
    salutation: "Liebe(r)",
    subject: "Hinterlassen Sie eine Bewertung",
    message: [
      "Da Sie vor kurzem",
      "benutzt haben, bitten wir Sie darum, eine ehrliche Bewertung über abzugeben.GEBEN SIE HIER EINE BEWERTUNG:"
    ],
    regards: ["Viele Grüße,", "das TrustSearch Team im Namen von "],
    footer:
      "P.S. TrustSearch ist ein neutraler Partner für Bewertungen, welcher die nötige Anonymität und Sicherheit gewährt, eine faire Bewertung zu hinterlassen. Indem Sie eine Bewertung abgeben, stimmen Sie den Nutzungsbedingungen in diesem Link zu."
  },
  "d-750571abc0fc4a63ac929d439c24a5bb": {
    templateLanguage: "russian",
    subject: "Поделитесь впечатлениями о Компании",
    salutation: "Здравствуйте",
    message: [
      "Расскажите миру о том, каково это - быть клиентом",
      "! Мы будем благодарны Вам за честный отзыв. Мы верим, что открыто делясь своими впечатлениями, вы делаете мир лучше!Пожалуйста, оставьте отзыв ЗДЕСЬ:"
    ],
    regards: ["Спасибо и всего наилучшего!", "От имени", "Команда TrustSearch"],
    footer:
      "P.S. TrustSearch - это независимый партнер по агрегации отзывов и противодействию мошенничеству в сети. Оставляя отзыв Вы соглашаетесь с нашей Политикой по конфиденциальности, доступной по этой ссылке."
  }
};

export const getEmailTemplateData = (
  tempId = "",
  key = "",
  entityDomain = ""
) => {
  const selectedTemplate = emailTemplates[tempId] || {};
  if (key === "message") {
    const exampleText = _get(selectedTemplate, "message", []);
    return (
      (exampleText[0] || "") +
      " " +
      (entityDomain || "") +
      " " +
      (exampleText[1] || "")
    );
  }
};
