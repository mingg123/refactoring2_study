let invoice = {
  customer: 'BigCo',
  performances: [
    {
      playID: 'hamlet',
      audience: 55,
    },
    {
      playID: 'as-like',
      audience: 35,
    },
    {
      playID: 'othello',
      audience: 40,
    },
  ],
};

let plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As ou Like It', type: 'comedy' },
  othello: { name: 'othello', type: 'tragedy' },
};

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }
  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performances.audience > 30) {
      result += 1000 * (this.performances.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performances.audience > 20) {
      result += 1000 + 500 * (this.performances.audience - 20);
    }
    result += 300 * this.performances.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performances.audience / 5);
  }
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}
function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(invoice);
  result.totalVolumeCredits = totalVolumeCredits(invoice);
  return result;
}
function enrichPerformance(aPerformance) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance),
  );

  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}
function renderPlainText(data, plays) {
  let result = `청구 내역(고객명 : ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name} : ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(totalAmount(data))}`;
  result += `적립포인트 : ${totalVolumeCredits(data)}점`;
  return result;
}
function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}
function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
function volumnCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ('comedy' === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
function amountFor(aPerformance) {
  return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}
console.log(statement(invoice, plays));
