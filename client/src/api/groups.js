import socket from './socket.js';

export function getGroups(callback) {
    socket.on('getGroups', data => callback(null, data));
}
