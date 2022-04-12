//리팩토링 전
function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    // 관련 로직 1
  } else {
    let deleveryTime;
    // 관련 로직 2
  }
}
//리팩토링 후
function deleverDate(anOrder, isRush) {
  if (isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}

function regularServiceCharge(anOrder) {
  let deliveryTime;
  //관련로직 1
}

function regularDeliveryDate(anOrder) {
  let deliveryTime;
  //관련 로직 2
}
