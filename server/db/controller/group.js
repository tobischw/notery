// Handles data querying for Groups

var Group = require('../controller/group');

// module.exports = getGroupById = (id) => {
//     var group = Group.findOne({_id: id});
//     if(!group) {
//         return new Error('Group Not Found!');
//     }
//     return group;
// }

// module.exports = createGroup = (name, color) => {
//     var group = new Group({
//         name: name,
//         color: color
//     })
//     try{
//         group.save();
//         return true;
//     }catch(e) {
//         return e;
//     }
    

// }

module.exports.createGroup = async (name, shortname, color, user) => {
    var group = new Group({
        name: name,
        shortname: shortname,
        color: color
    });
    
    user.groups.push(group);

    
    try {
        await group.save();
        await user.save();
        // return note;
    } catch (e) {
        return(e);
    }
    return note;
    
}
