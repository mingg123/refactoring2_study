//리팩토링 전
function potentialEnergy(mass, height) {
  return mass * 9.81 * height;
}

//리팩토링 후
const STANDRD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDRD_GRAVITY * height;
}
