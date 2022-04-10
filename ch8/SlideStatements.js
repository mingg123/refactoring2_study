//리팩토링 전
const pricingPlan = retrievPricingPlan();
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;

//리팩토링 후
const pricingPlan = retrievPricingPlan();
const chargePreUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
