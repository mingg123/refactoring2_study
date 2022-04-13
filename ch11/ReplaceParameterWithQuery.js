//리팩토링 전
avaliableVaction(anEmployee, anEmployee.grade);
function avaliableVaction(anEmployee, grade) {}

//리팩토링 후
avaliableVaction(anEmployee);
function avaliableVaction(anEmployee) {
  const grade = anEmployee.grade;
  //연휴 계산
}
