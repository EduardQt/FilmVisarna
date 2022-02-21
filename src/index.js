const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/index.html'));
});

app.get('/giftcard', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/giftcard.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
