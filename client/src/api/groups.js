import socket from './socket.js';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

export function getGroups(callback) {
    socket.emit('getGroups', null, (data) => {
        callback(data);
    });
}
