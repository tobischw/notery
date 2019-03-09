require('./db/mongoose.js');

// Deal with cors cuz its a butt
var cors = require('cors');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var User = require('./db/model/user');
var UserController = require('./db/controller/user');
var Group = require('./db/model/group');
var GroupController = require('./db/controller/group');
var Note = require('./db/model/note');
var NoteController = require('./db/controller/note');

var auth = require('./db/middleware/auth')


const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var initials = firstname.charAt(0) + lastname.charAt(0);

    var user = new User({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        initials: initials
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

app.post('/api/auth', async (req, res) => {
    var token = req.body.token;
    try {
        var user = await User.findByToken(token);
        res.status(200).send({});
    } catch (e) {
        console.log(e);
    }
});
// Authentication Middleware to determine if user has logged in before connecting
io.use(auth);

// Sockets BELOW MWHAHAHAHA
io.on('connection', async (socket) => {
    var token = socket.handshake.query.token;
    var user = await User.findByToken(token);
    console.log('User Connected!')

    // Do all the goodies here
    socket.on('getGroups', () => {

    })

});


