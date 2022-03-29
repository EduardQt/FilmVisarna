class Movie {
    constructor(id, movie_title, trailer_url, min_age, release_date, state, image_url, description) {
        this.id = id;
        this.movie_title = movie_title;
        this.trailer_url = trailer_url;
        this.min_age = min_age;
        this.release_date = new Date(release_date);
        this.state = state;
        this.image_url = image_url;
        this.description = description;
    }
}

module.exports = Movie;
