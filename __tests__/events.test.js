const vendor = require('../vender.js');


let logSpy = jest.spyOn(console, 'log').mockImplementation();

afterAll(() => {
  logSpy.mockRestore();
});

let fake = {
  store: 'store name',
  orderId: 'order',
  customerName: 'name',
  address: 'address',
  phoneNumber: 'phone'
}

describe('should test vendor.js console log', () => {

  it('checks new order console.logs', () => {
    vendor(fake);
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalled()
    }, 6000)
  });

  it('checks delievered console.logs', () => {
    vendor.delivered(fake);
    expect(logSpy).toHaveBeenCalled();
  });

});