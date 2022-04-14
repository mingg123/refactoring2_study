//리팩토링 전
if (data) return new ShippingRules(data);
else return -23;

//리팩토링 후

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류 ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return 'OrderProcessingError';
  }
}

try {
  calculateShippingCosts(orderData);
} catch (e) {
  if (e instanceof OrderProcessingError)
    errorList.push({ order: orderData, errorcode: e.code });
  else throw e;
}

if (data) return new ShippingRules(data);
else throw new OrderProcessingError(-23);

function calculateShippingCosts(anOrder) {
  const shippingRules = localShippingRules(anOrder.country);
}
