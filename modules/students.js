
'use strict';
const io = require('socket.io-client');
const faker = require('faker');
const socket = io.connect('http://localhost:3000/support');

socket.emit('getAll');

setInterval(() => {
  const newObj = new Student();
  socket.emit('help-need', newObj);
}, 4000);

socket.on('help-need', (payload) => {
  console.log(`***** Your TA ${payload.TA} will help you soon ${payload.studentName} `);
});

socket.on('finished', payload => {
  setTimeout(() => {
    console.log(`***** ${payload.studentName}, I hope you got help, have a wonderful LAB WORK!`)
  }, 7000);
});
class Student {
  constructor() {
    this.studentName = faker.name.firstName(),
      this.supportID = faker.address.zipCode(),
      this.tableNumber = faker.datatype.number(),
      this.TA = faker.name.firstName()
  }
};

console.log('STUDENTS-LIVE');