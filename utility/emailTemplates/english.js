import React from "react";

export default function englishTemplate({ name, domain, entity, services }) {
  return (
    <div>
      Leave a review on {Entity}
      Dear, {Name}! Since you recently used {domain}, we would like to ask you
      to leave an honest review of our {services}. Please leave a review HERE:
      Best regards, On behalf of {entity}
      The TrustSearch team P.S. TrustSearch is a neutral review gathering
      partner that provides the anonymity and security you need to leave a fair
      review. By leaving a review, you agree to the Privacy Policy at this link.
    </div>
  );
}
