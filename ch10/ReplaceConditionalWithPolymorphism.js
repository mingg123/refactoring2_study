//리팩토링 전
switch (BiquadFilterNode.type) {
  case '유럽 제비':
    return '보통이다';
  case '아프리카 제비':
    return bird.numberOfCounts > 2 ? '지쳤다' : '보통이다';
  case '노르웨이 파랑 앵무':
    return bird.voltage > 100 ? '그을렸다' : '예쁘다';
  default:
    return '알수 없다';
}

//리팩토링 후
class EuropeanSwallow {
  get plumage() {
    return '보통이다';
  }
}

class AfricanSwallow {
  get plumage() {
    return this.numberOfCounts > 2 ? '지쳤다' : '보통이다';
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? '그을렸다' : '예쁘다';
  }
}

//리팩토링 전
function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + ch * 2) return 'A';
  else return 'B';
}

function voyageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (['중국', '동인도'].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  let result = 1;
}
