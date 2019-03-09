// Handles data querying for Users

var User = require('../controller/user');

module.exports = getUserById = (id) => {
    var user = User.findOne({_id: id}, {tokens: 0});
    if(!user) {
        return new Error('User Not Found!');
    }
    return user;
}

module.exports = getUserGroups = (id) => {
    var user = User.findOne({_id: id}, 'groups');
    if(!user) {
        return new Error('User Not Found!');
    }

    return user;

}