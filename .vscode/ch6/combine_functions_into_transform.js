//리팩토링 전
function base(aReading) {}
function taxableCharge(aReading) {}

//리팩토링 후
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}

//example
reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

//client1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//client2
const aReading = acquirReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

//client3
const arEadting = acquirReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year),
  );
  return result;
}

//client3
const rawReading = acquirReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;
