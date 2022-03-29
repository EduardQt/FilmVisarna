// this part for grabing the container and classes which we have in the container.
const container = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();
let ticketPrice = +120;

// Save selected movie index and price
// the price will count by multiplying the value and the value is determined in index.html
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
// after choocing the movie name the price will change
//according to the movie name
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //available seats will be copied into arr
    // will choose the seats
    //return new array of indexes after choosing the seals

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage
//
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

// Seat click event
// this fuction will choose the seat
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

//  function which will intialy count  total price
updateSelectedCount();
