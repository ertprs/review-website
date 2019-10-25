import React from "react";

export default function englishTemplate({ name, domain, entity, services }) {
  return (
    <div>
      Atstājiet atsauksmi par {entity}
      Cien. {name}
      Tā kā pirms neilga laika Jūs izmantojāt {domain}, mēs vēlētos Jums lūgt
      atstāt atklātu atsauksmi par mūsu {services}. Lūdzu atstājiet atsaksmi
      ŠEIT: Ar cieņu,
      {entity} vārdā TrustSearch komanda P.S. TrustSearch ir neitrāls atsauksmju
      ievākšanas partneris, kas nodrošina anonimitāti un drošību, kas jums
      nepieciešama, lai atstātu godīgu atsauksmi. Atstājot atsauksmi, jūs
      piekrītat šajā linkā pieejamajā Privātuma politikai.
    </div>
  );
}
