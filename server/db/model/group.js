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

});

const Group = mongoose.model('Group', groupSchema)

module.exports = Group;