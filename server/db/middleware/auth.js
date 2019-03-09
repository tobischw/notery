var User = require('../model/user');
var jwt = require('jsonwebtoken');

const auth = async (socket, next) => {
    
    try {
        const token = socket.handshake.query.token
        const decoded = jwt.verify(token, 'tobistartedbaldingat20')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            next(new Error('User Not Found!'))
        }

        next()
    } catch (e) {
        console.log('Authentication Error!')
        next(new Error('Authentication error'));
    }
}

module.exports = auth;