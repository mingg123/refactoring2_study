// 리팩토링 전
let defaultOwner = {
  firstName: '마틴',
  lastName: '파울러',
};

// 리팩토링 후
let defaultOwner = {
  firstName: '마틴',
  lastName: '파울러',
};

export function defaultOwner() {
  return defaultOwner;
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {
    return this._lastName;
  }

  get firstName() {
    return this._firstName;
  }
}
