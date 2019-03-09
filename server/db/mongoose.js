const mongoose = require('mongoose')

const mongooseURI = 'mongodb://localhost/notery';
mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB CONNECTED!');
});