'use strict';

const socket = require('../index.js');

socket.on('start', newOrder);
socket.on('delivered', delievered);

function newOrder() {
  setInterval(() => {
    let fake = {
      storeName: faker.company.companyName(),
      orderId: faker.address.zipCode(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.phoneNumber()
    }

    console.log(`NEW ORDER: ITEM NEEDS TO BE PICKED UP \n
    ${fake.storeName}\n 
    ${fake.orderId}\n
    ${fake.customerName}\n
    ${fake.address}\n
    ${fake.phoneNumber}\n`)
    socket.emit('pickup', fake)
  }, 5000)
}

function delievered(payload) {
  console.log(`PACKAGE DELIEVERED ${payload.orderId} ON ${new Date()}`)
}

module.exports = {
  start: newOrder,
  delievered: delievered
}
