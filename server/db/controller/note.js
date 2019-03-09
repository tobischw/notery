// Handles data querying for Notes

var Note = require('../controller/note');

module.exports = createNote = (userId, groupId, document) => {
    var note = new Note({
        cretedBy: userId,
        group: groupId,
        document: document
    });
}