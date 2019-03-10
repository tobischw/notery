// Handles data querying for Notes
var Note = require('../model/note');
var Mongoose = require('mongoose');

module.exports.createNote = async (name, userID, groupID) => {
    var note = new Note({
        name: name,
        createdBy: Mongoose.Types.ObjectId(userID),
        group: Mongoose.Types.ObjectId(groupID)
    });

    try {
        await note.save();
        // return note;
    } catch (e) {
        return(e);
    }
    return note;
    
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

module.exports.getComments = async (noteID) => {
    var notes = await Note.findById(noteID, {comments:1}).populate('comments.user', 'firstname lastname');
    return notes;
}

module.exports.addComment = async (noteId, userId, quote, comment) => {
    var note = await note.findById(noteId, {comments:1})
    note.comments.push({
        user: Mongoose.Types.ObjectId(userId),
        quote: quote,
        comment: comment
    })
    try {
        await note.save();
        return note.comments;
    } catch(e) {
        console.log(e)
    }
    return false;
}