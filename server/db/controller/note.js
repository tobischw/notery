// Handles data querying for Notes
var Note = require('../model/note');
var Mongoose = require('mongoose');

module.exports = createNote = (name, userId, groupId, document) => {
    var note = new Note({
        name: name,
        cretedBy: userId,
        group: groupId,
        document: document
    });
}

module.exports.getNotesByGroup = (gid) => {
    var notes = Note.find({group: Mongoose.Types.ObjectId(gid)});
    return notes;

}

module.exports.getNotesByUser = (uid) => {
    var notes = Note.find({createdBy: uid});
    if(!notes) {
        return new Error('No Notes Found!');
    }

    return notes;
}

module.exports.getNoteByID = (id) => {
    var note = Note.findById(id);
    if(!note) {
        return new Error('No Note Found!');
    }

    return note;
}
