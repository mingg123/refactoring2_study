//리팩토링 전
let basePrice = anOrder.basePrice;
return basePrice > 1000;

//리팩토링 후
return anOrder.basePrice > 1000;
