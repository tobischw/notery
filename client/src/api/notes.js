import socket from './socket.js';

export function getNotesByGroup(groupID, callback) {
    socket.emit('getNotesByGroup', { groupID: groupID }, (data) => {
        callback(data);
    });
}
