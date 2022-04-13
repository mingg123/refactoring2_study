//리팩토링 전
leadEngineer = new Employee(document.leadEnginner, 'E');

//리팩토링 후
leadEngineer = createEmployee(document.leadEngineer);

function createEmployee(name) {
  return new Employee(name, 'E');
}
