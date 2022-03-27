var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
const Movie = require('./Movie')

class MovieController {
    fetchAllMovies() {
        return new Promise(((resolve) => {
            const stmt = db.prepare("SELECT * FROM movies;");
            stmt.all((err, rows) => {
                if (!rows.length) {
                    resolve(undefined);
                } else {
                    const movies = [];
                    for (const movie of rows) {
                        movies.push(new Movie(movie.id, movie.movie_title, movie.trailer_url, movie.min_age, movie.release_date, movie.state, movie.image_url));
                    }

                    resolve(movies);
                }
            });
        }));
    }
}

module.exports = MovieController;
