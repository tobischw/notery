// Handles data querying for Users

var User = require('../model/user');

module.exports.getUserById = (id) => {
    var user = User.findOne({_id: id}, {tokens: 0});
    if(!user) {
        return new Error('User Not Found!');
    }
    return user;
}

module.exports.getUserGroups = (id) => {
    var groups = User.findOne({_id: id}, "groups").populate('groups');
    if(!groups) {
        return new Error('User Not Found!');
    }

    return groups;

}