//리팩토링 전
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiple(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.mlutiple(1.05);
}
//리팩토링 후

function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiple(1 + factor);
}
