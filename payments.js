const params = new URLSearchParams(window.location.search);
const title = params.get('title');
const price = parseFloat(params.get('price'));
const time = params.get('time');
const url = params.get('url'); 
const tickets = parseInt(params.get('tickets'));

const movieCardContainer = document.getElementById('movie-card-container');
const movieCard = `
    <div class="card shadow-sm">
    <img src="${url}" class="card-img-top" alt="${title}">
    <div class="card-body">
        <p class="card-text"><strong>${title}</strong></p>
        <p class="card-text">Showtime: ${time}</p>
        <p class="card-text">Tickets: ${tickets}</p>
        <p class="card-text">Total Price: $${price.toFixed(2)}</p>
    </div>
    </div>
`;

movieCardContainer.innerHTML = movieCard;

function proceedPayment() {
    alert('Payment successful!');
    window.location.href = 'index.html';
}

