//리팩토링 전
let customer = new Customer(customerData);

//리팩토링 후
let customer = customerRepository.get(customerData.id);

//리팩토링 전
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
  }
  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}

//리팩토링 후

class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
  }
  get customer() {
    return this._customer;
  }
}

let _repostiroyData;
export function initialize() {
  _repostiroyData = {};
  _repostiroyData.customers = new Map();
}

export function registerCustomer(id) {
  if (!_repostiroyData.customers.has(id))
    _repostiroyData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repostiroyData.customers.get(id);
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}
