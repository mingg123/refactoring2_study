//리팩토링 전
if (!aDate.isBeforE(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else charge = quantity * plan * regulareRate + plan.regularServiceCharge;

//리팩토링 후
if (summer()) charge = summerCharge();
else charge = regularCharge();

function summer() {
  return !aDate.isBeforE(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function smmerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan * regulareRate + plan.regularServiceCharge;
}
