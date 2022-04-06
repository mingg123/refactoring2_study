//리팩토링 전
const orderData = orderString.split('/s+/');
const producePrice = priceList[orderData[0].split('-')[1]];
const orderPrice = parseInt(orderData[1]) * producePrice;

//리팩토링 후
const orderRecode = parseOrder(order);
const orderPrice = price(orderRecode, priceList);

function parseOrder(aString) {
  const values = aString.split('/s+/');
  return {
    produceID: values[0].split('-')[1],
    quantity: parseInt(values[1]),
  };
}

function price(order, priceList) {
  return order.quantity * priceList[order.produceID];
}

// 리팩토링 전
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingcost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingcost;
  return price;
}

//리팩토링 후
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePriceData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}
function calculatePriceData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData = {
    basePrice: basePrice,
    quantity: quantity,
    discount: discount,
  };
  return priceData;
}
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingcost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingcost;
  return price;
}
