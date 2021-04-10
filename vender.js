'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const faker = require('faker');
const socket = io.connect(host);
const capsSocket = io.connect(`${host}/caps`);
require('dotenv').config();


capsSocket.emit('getAll');

class Orders {
  constructor() {
    let store = process.env.STORE_NAME;
    this.store = store;
    this.orderId = faker.datatype.number(),
      this.customerName = faker.name.findName(),
      this.address = faker.address.streetAddress(),
      this.phoneNumber = faker.phone.phoneNumber()
  }
};

setInterval(() => {
  const newOrd = new Orders();
  capsSocket.emit('pickup', newOrd);
}, 4000);

capsSocket.on('pickup', (payload) => {
  console.log(`***** YOUR ORDER # ${payload.orderId} HAS BEEN RECIEVED FOR CUSTOMER: ${payload.customerName} `);
});

capsSocket.on('delivered', payload => {
  setTimeout(() => {
    console.log(`***** ORDER # ${payload.orderId} HAS BEEN DELIVERED, HAVE A NICE DAY ${payload.customerName} `);
  }, 7000);
});

console.log('VENDERS-LIVE');

// let store = process.env.STORE_NAME;

// setInterval(() => {
//   let fake = {
//     store: store,
//     orderId: faker.datatype.number(),
//     customerName: faker.name.findName(),
//     address: faker.address.streetAddress(),
//     phoneNumber: faker.phone.phoneNumber()
//   }

//   let payload = {
//     fake: fake,
//   }
//   console.log(`NEW ORDER: ITEM NEEDS TO BE PICKED UP \n
//     ${fake.store}\n 
//     ${fake.orderId}\n
//     ${fake.customerName}\n
//     ${fake.address}\n
//     ${fake.phoneNumber}\n`)
//   capsSocket.emit('pickup', payload)
// }, 5000)


// function delievered(payload) {
//   console.log(`PACKAGE DELIEVERED ${payload.orderId} ON ${new Date()}`)
// }