import React from "react";

export default function englishTemplate({ name, domain, entity, services }) {
  return (
    <div>
      Geben Sie bitte eine Bewertung ab für {entity}
      Liebe(r) {name}, Da Sie vor kurzem{domain}benutzt haben, bitten wir Sie
      darum, eine ehrliche Bewertung über {services} abzugeben. GEBEN SIE HIER
      EINE BEWERTUNG Viele Grüße, das TrustSearch Team im Namen von {entity}
      P.S. TrustSearch ist ein neutraler Partner für Bewertungen, welcher die
      nötige Anonymität und Sicherheit gewährt, eine faire Bewertung zu
      hinterlassen. Indem Sie eine Bewertung abgeben, stimmen Sie den
      Nutzungsbedingungen in diesem Link zu.
    </div>
  );
}
