// User Model
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;
//var validator = require('validator');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#3b5998"
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            unique: true
        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'tobistartedbaldingat20')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.statics.findByToken = async (token) => {
        const decoded = jwt.verify(token, 'tobistartedbaldingat20');
        const user = User.findOne({ '_id': decoded._id, 'tokens.token': token}, {tokens: 0});  

        if (!user) {
            throw new Error('Unable to login')
        }

        return user

}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User;