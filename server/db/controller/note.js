// Handles data querying for Notes
var Note = require('../model/note');
var Mongoose = require('mongoose');

module.exports = createNote = (name, userId, groupId, document) => {
    var note = new Note({
        name: name,
        createdBy: userId,
        group: groupId,
        document: document
    });
}

module.exports.getNotesByGroup = (gid) => {
    var notes = Note.find({group: Mongoose.Types.ObjectId(gid)}, {name:1, createdBy:1}).populate('createdBy', 'firstname lastname');
    //console.log(notes);
    return notes;

}

module.exports.getNotesByUser = (uid) => {
    var notes = Note.find({createdBy: Mongoose.Types.ObjectId(uid)});
    return notes;
}

module.exports.getNoteByID = (id) => {
    var note = Note.findById(id);
    if(!note) {
        return new Error('No Note Found!');
    }

    return note;
}

module.exports.saveNote = async (noteid, document) => {
    var note = await Note.findById(noteid)
    note.document = document;
    try {
        await note.save()
        return true
    } catch(e) {
        console.log(e);
    }
    return false;
}
