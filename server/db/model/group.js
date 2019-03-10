// User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortname: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#FF4500" 
    },
    messages: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                required: true,
                default: new Date()
            }
        }
    ],

});

const Group = mongoose.model('Group', groupSchema)

module.exports = Group;