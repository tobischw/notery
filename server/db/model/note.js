// Note Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            quote: {
                type: String
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    document: {
        type: String,
        required: true
    }
});

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
