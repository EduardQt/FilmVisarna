const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'www/login.html'));
});

app.get('/giftcard', function (req, res) {
    res.sendFile(path.join(__dirname, 'www/giftcard.html'));
});

app.get('/styles/giftcard.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'styles/giftcard.css'));
});

app.get('/img/banner.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/img/banner.png'));
});

// owl carousel
app.get('/owl.carousel.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.carousel.css'));
});

app.get('/owl.theme.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.theme.css'));
});

app.get('/owl.carousel.min.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.carousel.min.js'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
