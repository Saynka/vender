'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const faker = require('faker');
const socket = io.connect(host);
const capsSocket = io.connect(`${host}/caps`);
require('dotenv').config();


// capsSocket.emit('start');



capsSocket.on('delivered', delievered);

let store = process.env.STORE_NAME;

setInterval(() => {
  let fake = {
    store: store,
    orderId: faker.datatype.number(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber()
  }

  let payload = {
    fake: fake,
  }
  console.log(`NEW ORDER: ITEM NEEDS TO BE PICKED UP \n
    ${fake.store}\n 
    ${fake.orderId}\n
    ${fake.customerName}\n
    ${fake.address}\n
    ${fake.phoneNumber}\n`)
  capsSocket.emit('pickup', payload)
}, 5000)


function delievered(payload) {
  console.log(`PACKAGE DELIEVERED ${payload.orderId} ON ${new Date()}`)
}