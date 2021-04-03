'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';
const faker = require('faker');
const socket = io.connect(host);
const venderSocket = io.connect(`${host}/caps`);
require('dotenv').config();


venderSocket.emit('start');


venderSocket.on('start', newOrder);
venderSocket.on('delivered', delievered);


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
    venderSocket.emit('pickup', fake)
  }, 5000)
}

function delievered(payload) {
  console.log(`PACKAGE DELIEVERED ${payload.orderId} ON ${new Date()}`)
}




module.exports = {
  start: newOrder,
  delievered: delievered
}




