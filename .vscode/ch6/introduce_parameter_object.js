//리팩토링 전
function amountInvoiced(startDate, endDate) {}
function amountReceived(startDate, endDate) {}
function amountOverdue(startDate, endDate) {}

//데이터의 구조를 묶어준다.

//리팩토링 후
function amountInvoiced(aDateRange) {}
function amountReceived(aDateRange) {}
function amountOverdue(aDateRange) {}

//예시

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};

function readingOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.tmep));
}

const range = new NumberRange(
  operatingPlan.tempratureFloor,
  operatingPlan.tempratureCeiling,
);

alerts = readingOutsideRange(station, range);

class NumberRange {
  constructor(arg) {
    return arg >= this.main && arg <= this.max;
  }

  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}
