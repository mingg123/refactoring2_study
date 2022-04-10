//리팩토링 전
class ProductionPlan {
  get discountedTotal() {
    return this._discountedTotal;
  }
  set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old - aNumber;
  }
  //리팩토링 후

  get discountedTotal() {
    return this._baseTotal - this._discount;
  }

  set discount(aNumber) {
    this._discount = aNumber;
  }
}

//리팩토링 전
class ProductionPlan {
  get production() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

//리팩토링 후
class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
