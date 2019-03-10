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
        res.status(201).send({ token })
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

app.post('/api/group', async (req, res) => {
    var name = req.body.name;
    var shortname = req.body.shortname;
    var color = req.body.color || "#FF4500";

    var group = new Group({
        name: name,
        shortname: shortname,
        color: color
    })

    try {
        await group.save()
        res.status(201).send('Success!')
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/api/addtogroup', async (req, res) => {
    var user = await User.findByCredentials(req.body.username, req.body.password);
    var group = await Group.findOne({shortname: req.body.name});

    user.groups.push(group);

    try {
        await user.save()
        res.status(201).send('Success!')
    } catch (e) {
        res.status(400).send(e)
    }

});

app.post('/api/createnote', async (req, res) => {
    var note = new Note({
        name: req.body.name,
        createdBy: req.body.userId,
        group: req.body.groupId,
        document: req.body.document
    })



    try {
        await note.save()
        res.status(201).send('Success!')
    } catch (e) {
        res.status(400).send(e)
    }

});

app.post('/api/addcomment', async (req, res) => {

    try {
        var comments = await NoteController.addComment(req.body.noteID, req.body.uid, req.body.quote, req.body.comment)
        res.status(201).send(comments)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
});

// Authentication Middleware to determine if user has logged in before connecting
io.use(auth);

// Sockets BELOW MWHAHAHAHA
io.on('connection', async (client) => {
    var token = client.handshake.query.token;
    var user = await User.findByToken(token);
    // console.log('Token: ' + token)
    console.log('User Connected!: ' + user.username);


    // Do all the goodies here
    client.on('getGroups', async (data, cb) => {
        groups = await UserController.getUserGroups(user._id);
        cb(groups);
    });

    client.on('getNotesByGroup', async (data, cb) => {
        notes = await NoteController.getNotesByGroup(data.groupID);
        var data = {
            notes: notes,

        }

        cb(notes);
    });

    client.on('getNotesByUser', async (data, cb) => {
        groups = await NoteController.getUserGroups(user._id);

        cb(notes);
    });

    client.on('getNoteByID', async (data, cb) => {
        var note = await NoteController.getNoteByID(data.noteID);

        cb(note)
    })

    client.on('createNote', async (data, cb) => {
        var note = await NoteController.createNote(data.name, user._id, data.groupID);
        cb(note);
    });

    client.on('saveNote', async (data, cb) => {
        var bool = await NoteController.saveNote(data.noteID, data.document);
        client.emit('updateNotes', data);
        cb(bool)
    })

    client.on('newComment', async (data, cb) => {
        var comments = await NoteController.addComment(data.noteID, user._id, data.quote, data.comment)
        client.emit('updateComments', comments);

    });

    client.on('getComments', async (data, cb) => {
        var comments = await NoteController.getComments(data.noteID);
        cb(comments);
    })

    client.on('newMessage', async (data, cb) => {
        var message = await GroupController.getMessages(data.groupID);
        
        client.emit('updateMessages', message);
        
    });

    client.on('getMessages', async (data, cb) => {
        var messages = await GroupController.getMessages(data.groupID);
        cb(messages);
    })

});


