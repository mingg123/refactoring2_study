//리팩토링 전
manager = aPerson.department.manager;

//리팩토링 후
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}

//리팩토링 전
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this.name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this.manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
//리팩토링 후
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this.name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
  get manager() {
    return this._department.manager;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this.manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
