import socket from './socket.js';

export function getNotesByGroup(groupID, callback) {
    socket.emit('getNotesByGroup', { groupID: groupID }, (data) => {
        callback(data);
    });
}
export function getNoteByID(noteID, callback) {
    socket.emit('getNoteByID', { noteID: noteID }, (data) => {
        callback(data);
    });
}
export function createNote(name, groupID, callback) {
    socket.emit('createNote', { name: name, groupID: groupID }, (data) => {
        callback(data);
    });
}

export function saveNote(noteID, value, callback) {
    socket.emit('saveNote', { noteID: noteID, document: value }, (data) => {
        callback(data);
    });
}
