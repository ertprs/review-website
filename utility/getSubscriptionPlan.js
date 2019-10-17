const BUSINESS_FREE = 1;
const BUSINESS_PREMIUM = 2;
const BUSINESS_PROFESSIONAL = 3;

const getSubscriptionPlan = planId => {
  if (planId === 1) {
    return "Free";
  } else if (planId === 2) {
    return "Premium";
  } else if (planId === 3) {
    return "Professional";
  } else {
    return "Invalid Plan";
  }
};

export default getSubscriptionPlan;
