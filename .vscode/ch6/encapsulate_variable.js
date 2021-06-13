//리팩토링 전
let defaultOwner = { firstName: '마틴', lastName: '파울러' };

//리팩토링 후
//캡슐화 하기
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };

export function defaultOwner() {
  return defaultOwnerData;
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

//값 캡슐화 하기

const owner1 = defaultOwner();
asserts.equal('파울러', ower1.lastName, '처음 값 확인');
const owner2 = defaultOwner();
owner2.lastName = '파슨스';
assert.equal('파슨스', owner1.lastName, 'owner2ㄹ르 변경한 후');

//레코드 캡슐화 하기
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };
export function defaultOwner() {
  return new Person(defaultOwnerData);
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
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
