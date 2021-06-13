//리팩토링 전

const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split('-')[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

//리팩토링 후

const orderRecode = parseOrder(order);
const orderPrice = price(orderRecode, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return {
    produceID: values[0].split('-')[1],
    quantity: parseInt(values[1]),
  };
}

function price(order, parseList) {
  return order.quantity * priceList[order.produceID];
}

//예시
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return { basePrice: basePrice, quantity: quantity, discount: discount };
}
function applyShipping(priceData, shippingMethod) {
  const shippingPercase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePercase;
  const shippingCost = priceData.quantity * shippingPercase;
  //   const price = priceData.basePrice - priceData.discount + shippingCost;
  return priceData.basePrice - priceData.discount + shippingCost;
}
