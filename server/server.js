require('./db/mongoose.js');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var User = require('./db/model/user');
var auth = require('./db/middleware/auth')

const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
server.listen(port, () => { console.log(`Server running on port ${port}`)})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// Handle User Login
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token })
    } catch (e) {
        res.status(400).send()
    }
});

// Handle User Registration
app.post('/api/register', async (req, res,) => {


    var username = req.body.username;
    var password = req.body.password;

    var user = new User({
        username: username,
        password: password
    });
    console.log(user);

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
});
// Authentication Middleware to determine if user has logged in before connecting
io.use(auth);

// Sockets BELOW MWHAHAHAHA
io.on('connection', (socket) => {
    var token = socket.handshake.query.token;
    console.log('User Connected!')

})


