//리팩토링 전
function rating(aDriver) {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver) {
  return aDriver.numberOfLateDeliveries > 5;
}

//리팩토링 후
function refactor_rating(aDriver) {
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}
