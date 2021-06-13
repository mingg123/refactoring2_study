//리팩토링 하기 전
function isNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

//임시 리팩토링 후
function isNewEngland(aCustomer) {
  //   const stateCode = aCustomer.address.state;
  return xxNewisNewEngland(aCustomer.address.state);
}

function xxNewisNewEngland(StateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

//최종 리팩토링
function isNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

const newEnglanders = someCustomers.filter((c) =>
  isNewEngland(c.address.state),
);
