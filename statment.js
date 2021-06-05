import createStatememtData from './createStatementData.js';
import fs from 'fs';
const playsStr = fs.readFileSync('./data/plays.json', 'utf-8');
const invoicesSte = fs.readFileSync('./data/invoices.json', 'utf-8');

const plays = JSON.parse(playsStr);
const invoice = JSON.parse(invoicesSte);

// htmlStatement(invoice, plays);

const res = statement(invoice, plays);
console.log(res);

function statement(invoice, plays) {
  return renderPlanText(createStatememtData(invoice, plays));
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
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatememtData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>청구 내역(고객명: ${Idata.customer})</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>연극</th><th>좌석 수 </th><th>금액</th></tr>';

  for (let perf of Idata.performances) {
    result += ' <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>';
    result += '<td>${usd(perf.amount)}</td></tr>\n';
  }
  result += '</table>\n';
  result += `<p>총액: ${usd(Idata.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: ${Idata.totalVolumnCredits} </em>점</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
