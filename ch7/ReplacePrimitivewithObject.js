//리팩토링 전
orders.filter((o) => ('high' === o.priority) | ('rush' == o.priority));

//리팩토링 후
orders.filter((o) => o.priority.higherThan(new Priority('normal')));

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value)) this._value = value;
    else throw new Error(`${value} is invalid for Priority`);
  }
  toString() {
    return this._value;
  }
  get_index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }
  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }
  equals(other) {
    return this._index === other._index;
  }
  higherThan(other) {
    return this._index > other._index;
  }
  lowerThan(other) {
    return this._index < other._index;
  }
}
