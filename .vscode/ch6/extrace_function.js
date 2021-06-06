//리팩토링 전
function printOwing(invoice) {
  let outstanding = 0;
  console.log('*****************');
  console.log('****고객 채무 ****');
  console.log('*****************');

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );

  console.log('고객명: ${invoice.customer}');
  console.log('채무액 : ${outstanding}');
  console.log('마감일 : ${invoice.dueDate.toLocalDateString()}');
}
//리팩토링 후

function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice); // 바뀌는 변수가 하나라면 함수의 return 을 이용하여 값을 반환
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log('*****************');
  console.log('****고객 채무 ****');
  console.log('*****************');
}
function printDetails(invoice, outstanding) {
  console.log('고객명: ${invoice.customer}');
  console.log('채무액 : ${outstanding}');
  console.log('마감일 : ${invoice.dueDate.toLocalDateString()}');
}
function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}
