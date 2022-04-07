//리팩토링 전
class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode})`;
  }

  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }

  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

//리팩토링 후
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}
class TelephoneNumber {
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get areaCode() {
    return this._areaCode;
  }

  set number(arg) {
    this._number = arg;
  }
  get number() {
    return this._number;
  }
}
