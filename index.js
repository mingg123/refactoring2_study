import fs from 'fs';
const playsStr = fs.readFileSync('./data/plays.json', 'utf-8');
const invoicesSte = fs.readFileSync('./data/invoices.json', 'utf-8');

const plays = JSON.parse(playsStr);
const invoice = JSON.parse(invoicesSte);

function amountFor(aPerformance) {
  let result = 0;
  switch (
    playFor(aPerformance).type //비극
  ) {
    case 'tragedy':
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case 'comedy': //희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function volumnCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ('comedy' === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}
function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function totalVolumnCredits() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumnCreditsFor(perf);
  }
  return result;
}

function totalAmount() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}
function statement(invoice, plays) {
  let result = `청구 내역(고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } 석)\n`;
  }

  let volumeCredits = totalVolumnCredits();

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${volumeCredits} 점\n`;
  return result;
}

const res = statement(invoice, plays);
console.log(res);
