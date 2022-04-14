//리팩토링 전
class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}
class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
//리팩토링 후
class Order {
  get daysToShip() {
    return this._priorityDelegate
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}
class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}

//리팩토링 전
function createBird(data) {
  switch (data.type) {
    case '유럽 제비':
      return new EuropeanSwallow(data);
    case '아프리카 제비':
      return new AfricanSwallow(data);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
  }
  get name() {
    return this._name;
  }
  get plumage() {
    return this._plumage || '보통이다';
  }
  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCounts = data.numberOfCounts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCounts;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.idNailed;
  }
  get plumage() {
    if (this._voltage > 100) return '그을렸다';
    else return this._plumage || '예쁘다';
  }
  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

//리팩토링 후

function createBird(data) {
  return new Bird(data);
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }
  get name() {
    return this._name;
  }

  get plumage() {
    return this._speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate();
      case '아프리카 제비':
        return new AfricanSwallowDelegate();
      case '노르웨이 파랑 앵무':
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}

class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }
  get plumage() {
    return this._bird._plumage || '보통이다';
  }
  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class EuropeanSwallow {
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCounts = data.numberOfCounts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCounts;
  }
}

class AfricanSwallow {
  get airSpeedVelocity() {
    return this.selectSpeciesDelegate.airSpeedVelocity;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._bird = bird;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
  get plumage() {
    if (this._voltage > 100) return '그을렸다';
    else return this._plumage || '예쁘다';
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return this._speciesDelegate.plumage;
  }
}
