//리팩토링 전
let averageAge = 0;
let totalSalary = 0;
for (const p of peolpe) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / peolpe.length;

//리팩토링 후
let totalSalary = 0;
for (const p of peolpe) {
  totalSalary += p.salary;
}

let averageAge = 0;
for (const p of peolpe) {
  averageAge += p.age;
}

averageAge = averageAge / peolpe.length;
