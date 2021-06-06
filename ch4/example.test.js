const { createProvince, sampleProvinceData } = require('./province');

//createPRovince는 new Province역할을 함

describe('province', function () {
  const asia = createProvince(sampleProvinceData());
  it('shortfall', () => {
    // const asia = createProvince(sampleProvinceData());
    expect(asia.shortfall).toBe(5);
  });
  it('profit', function () {
    // const asia = createProvince(sampleProvinceData());
    expect(asia.profit).toBe(230);
  });
  it('change production', function () {
    // const asia = createProvince(sampleProvinceData());
    asia.producers[0].production = 20;
    expect(asia.shortfall).toBe(-6);
    expect(asia.profit).toBe(292);
  });
  //   it('zero demand', function () {
  //     const asia = createProvince(sampleProvinceData());
  //     asia.demand = 0;
  //     expect(asia.shrotfall).toBe(-25);
  //     expect(asia.profit).toBe(0);
  //   });
  it('negative demand', function () {
    // const asia = createProvince(sampleProvinceData());
    asia.demand = -1;
    expect(asia.shortfall).toBe(-37);
    expect(asia.profit).toBe(-10);
  });
  it('empty string demand', function () {
    asia.demand = '';
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

describe('no producers', function () {
  let noProducers;
  const data = {
    name: 'No producers',
    producers: [],
    demand: 30,
    price: 20,
  };

  noProducers = createProvince(data);

  it('shortfall', function () {
    expect(noProducers.shortfall).toBe(30);
  });
  it('profit', function () {
    expect(noProducers.profit).toBe(0);
  });
});

// describe('string for producers', function () {
//   it('', function () {
//     const data = {
//       name: 'String producers',
//       producers: '',
//       demand: 30,
//       price: 20,
//     };
//     const prov = createProvince(data);
//     expect(prov.shortfall).toBe(0);
//   });
// });
