var express = require('express');
var router = express.Router();
const path = require('path');

const AuthController = require('./Auth/AuthController');

router.get(['/', '/index', '/home'], function (req, res) {
    res.render('index');
});

router.get('/login', async function (req, res) {
    res.render('login');
});

router.get('/logout', function (req, res) {
    //Invalidate the user in session and redirect to home page.
    req.session.user = undefined;
    res.redirect('/index');
});

router.post('/login', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const result = await new AuthController().onLogin(email, password);

    //Make sure the old session is destroyed.
    if (req.session) {
        req.session.user = undefined;
    }

    if (result) {
        req.session.user = result;
        res.redirect('/index');
    } else {
        req.session.user = undefined;
        res.render('login');
    }
});

router.get('/giftcard', function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../www/giftcard.html'));
});

router.get('/styles/giftcard.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../styles/giftcard.css'));
});

// owl carousel
router.get('/owl.carousel.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.carousel.css'));
});

router.get('/owl.theme.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.theme.css'));
});

router.get('/owl.carousel.min.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/owlcarousel/owl-carousel/owl.carousel.min.js'));
});

module.exports = router;
