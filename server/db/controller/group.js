// Handles data querying for Groups

var Group = require('../controller/group');

module.exports = getGroupById = (id) => {
    var group = Group.findOne({_id: id});
    if(!group) {
        return new Error('Group Not Found!');
    }
    return group;
}

module.exports = createGroup = (name, color) => {
    var group = new Group({
        name: name,
        color: color
    })
    try{
        group.save();
        return true;
    }catch(e) {
        return e;
    }
    

}