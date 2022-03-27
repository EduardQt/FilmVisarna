const path = require('path');

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
const express = require('express')
const app = express();
const port = 3000
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'test123';



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat is everything we need!',
    store: new FileStore(fileStoreOptions),
}))

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
const routes = require('./src/Routes');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
