var express = require('express');
var router = express.Router();
const path = require('path');

const AuthController = require('./Auth/AuthController');
const MovieController = require('./Movie/MovieController');
const GiftcardController = require('./Giftcard/GiftcardController');

router.get(['/', '/index', '/home'], async function (req, res) {
    const result = await new MovieController().fetchAllMovies();
    res.render('index', {
        movies: result
    });
});

router.get('/login', async function (req, res) {
    res.render('login');
});

router.get('/screenings', async function (req, res) {
    if (req.session.user !== undefined) {
        const result = await new MovieController().fetchAllMovies();
        res.render('screenings', {
            movies: result
        });
    } else {
        res.render('login')
    }
});

router.get(['/movie'], async function (req, res) {
    let movieId = req.query.movieId;
    const result = await new MovieController().fetchAllMovies();
    let movieBase = null;
    for (const movie of result) {
        if (movie.id === parseInt(movieId)) {
            movieBase = movie;
        }
    }

    res.render('movie', {
        movie: movieBase
    });
});

router.get(['/location'], async function (req, res) {

    res.render('location');
});

router.post('/creategiftcard', async function (req, res) {
    let card = req.body;
    await new GiftcardController().createGiftCard(card.fromName, card.toName, card.code);
    return res.status(200).json('Card created');
});

router.get('/fetchgiftcard', async function (req, res) {
    let response = await new GiftcardController().readGiftCard(req.query.code);
    return res.status(200).json(response);
});

router.get('/giftcard', async function (req, res) {
    res.render('giftcard');
});

router.get('/booking', async function (req, res) {
    res.render('booking');
});

router.get('/logout', function (req, res) {
    //Invalidate the user in session and redirect to home page.
    req.session.user = undefined;
    res.redirect('/index');
});

router.get('/tickets', async function (req, res) {
    res.render('tickets');
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

router.get('/styles/giftcard.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../styles/giftcard.css'));
});

router.get('/styles/styletickets.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../styles/styletickets.css'));
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
