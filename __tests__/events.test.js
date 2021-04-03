const vendor = require('../vender.js');


let logSpy = jest.spyOn(console, 'log').mockImplementation();

afterAll(() => {
  logSpy.mockRestore();
});

let fake = {
  storeName: 'store name',
  orderId: 'order',
  customerName: 'name',
  address: 'address',
  phoneNumber: 'phone'
}

describe('should test vendor.js console log', () => {

  it('checks new order console.logs', () => {
    vendor.start(fake);
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalled()
    }, 6000)
  });

  it('checks delievered console.logs', () => {
    vendor.delievered(fake);
    expect(logSpy).toHaveBeenCalled();
  });

});