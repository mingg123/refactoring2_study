//리팩토링 전
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;

//리팩토링 후

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    const discountFactor = this.discountFactor;
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this._quantity * this.item.price;
  }
  get discountFactor() {
    var discountFactor = 0.98;
    if (this.basePrice > 1000) discountFactor -= 0.03;
    return discountFactor;
  }
}
