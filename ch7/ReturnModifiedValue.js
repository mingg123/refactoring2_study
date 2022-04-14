//리팩토링 전
let totalAscent = 0;
calculateAscent();
function calculateAscent() {
  for (let i = 1; i < points.length; i++) {
    const verticalCharge = points[i].elevation - points[i - 1].elevation;
    totalAscent += verticalCharge > 0 ? verticalCharge : 0;
  }
}

//리팩토링 후
const totalAscent = calculateAscent();
function calculateAscent() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalCharge = points[i].elevation - points[i - 1].elevation;
    result += verticalCharge > 0 ? verticalCharge : 0;
  }
  return result;
}
