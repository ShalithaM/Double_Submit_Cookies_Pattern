var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const express = require('express')
var cors = require('cors')
const uuid = require('uuid/v4')
const session = require('express-session')
var time = require('express-timestamp')

var parseForm = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(time.init);

let userlist = {user: '', sessioniD: '', token: ''};

app.use(session({
    genid: (req) => {
      return uuid()
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    if(req.body.username == "admin" && req.body.password == "admin") {
        userlist = {
            user: req.body.username,
            sessioniD: req.sessionID
        }
        res.send({sessioniD: userlist.sessioniD, csrftoken: req.sessionID + req.timestamp});
    }
});

app.post('/transfer', (req, res) => {
    if(req.headers.sid == userlist.sessioniD) {
        if(req.body.token == req.headers.csrf) {
            res.send({result: 'Transacation complete'});
        }
        else {
            res.send({result: 'Invalid Token'});
        }
    }
    else {
        res.send({result: 'Invalid Cookie'});
    }
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));