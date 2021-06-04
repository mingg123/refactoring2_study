import fs from 'fs';
const playsStr = fs.readFileSync('./data/plays.json', 'utf-8');
const invoicesSte = fs.readFileSync('./data/invoices.json', 'utf-8');

const plays = JSON.parse(playsStr);
const invoice = JSON.parse(invoicesSte);

function statement(invoice, plays) {
  return renderPlanText(createStatememtData(invoice, plays));

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumnCreditsFor(result);
    return result;
  }
  function createStatememtData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumnCredits = totalVolumnCredits(statementData);
    return statementData;
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result;
  }
  function volumnCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ('comedy' === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }
  function totalAmount(data) {
    let result = 0;
    //반복문을 파이프라인으로 바꾸기
    // for (let perf of data.performances) {
    //   result += perf.amount;
    // }
    // return result;
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
  function totalVolumnCredits(data) {
    let result = 0;
    // for (let perf of data.performances) {
    //   result += perf.volumeCredits;
    // }
    // return result;
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function renderPlanText(Idata, plays) {
  let result = `청구 내역(고객명: ${Idata.customer})\n`;
  for (let perf of Idata.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } 석)\n`;
  }

  result += `총액: ${usd(Idata.totalAmount)}\n`;
  result += `적립 포인트: ${Idata.totalVolumnCredits} 점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
const res = statement(invoice, plays);
console.log(res);
