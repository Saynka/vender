'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';
const socket = io.connect(host);
socket.emit('start');


