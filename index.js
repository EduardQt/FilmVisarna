const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'www/login.html'));
});3

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
