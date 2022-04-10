//리팩토링 전
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this._discountRate;
  }
}

//리팩토링 후
class Customer {
  get plan() {
    return this._plan;
  }

  get discountRate() {
    return this.plan.discountRate;
  }
}

//리팩토링 전
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }
  get discountRate() {
    return this._discountrate;
  }
  becomePreferred() {
    this._discountRate += 0.03;
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}

//리팩토링 후
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }
  get discountRate() {
    return this._contract.discountRate;
  }
  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }
  becomePreferred() {
    _setDiscountRate((this.discountRate += 0.03));
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }
  get discountRate() {
    return this._discountRate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}
