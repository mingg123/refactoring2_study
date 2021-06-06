const { createProvince, sampleProvinceData } = require('./province');

//createPRovince는 new Province역할을 함

describe('province', function () {
  it('shortfall', () => {
    const asia = createProvince(sampleProvinceData());
    expect(asia.shortfall).toBe(5);
  });
  it('profit', function () {
    const asia = createProvince(sampleProvinceData());
    expect(asia.profit).toBe(230);
  });
});
