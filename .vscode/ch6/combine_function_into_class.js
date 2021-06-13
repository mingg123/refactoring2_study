//리팩토링 전
function base(aReading) {}
function taxableCharge(aReading) {}

function calculateBaseCharge(aReading) {}

//리팩토링 후
class Readint {
  base() {}
  taxableCharge() {}
  calculateBaseCharge() {}
}

//예시

//client1
const aReading = acquirReading();
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

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }

  get quantity() {
    return this._quantity;
  }

  get month() {
    return this._month;
  }

  get year() {
    return this._year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

//client1
const rawReading = acquirReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;

//client2
const rawReading = acquirReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
