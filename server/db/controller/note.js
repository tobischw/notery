// Handles data querying for Notes

var Note = require('../controller/note');

module.exports = createNote = (userId, groupId, document) => {
    var note = new Note({
        cretedBy: userId,
        group: groupId,
        document: document
    });
}

module.exports = getNotesByGroup = (gid) => {
    var notes = Note.find({group: gid});
    if(!notes) {
        return new Error('No Notes Found!');
    }

    return notes;
}

module.exports = getNotesByUser = (uid) => {
    var notes = Note.find({createdBy: uid});
    if(!notes) {
        return new Error('No Notes Found!');
    }

    return notes;
}