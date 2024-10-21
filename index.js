function showCardsContainingDescriptionA() {
  const inputField = document.getElementById("descriptionInput");
  inputField.style.display = "block";
}

function showCardsContainingDescriptionB() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((myMovies) => loadMovies(myMovies, 3))
    .catch((err) => console.log("Error :" + err));
}

function showCardsSortedByPriceLowHigh() {
  fetch("./data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      loadMovies(data, 1);
    })
    .catch(function (err) {
      console.log("error:" + err);
    });
}

function showCardsSortedByPriceHighLow() {
  fetch("./data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      loadMovies(data, 2);
    })
    .catch(function (err) {
      console.log("error:" + err);
    });
}

function loadMovies(movies, option) {
  let arrayMovies = [];
  for (let i = 0; i < movies.movies.length; i++) {
    arrayMovies.push(movies.movies[i]);
  }

  let sortedMovies = [];
  if (option === 1) {
    sortedMovies = arrayMovies.sort((p1, p2) =>
      p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
    );
  } else if (option === 2) {
    sortedMovies = arrayMovies.sort((p1, p2) =>
      p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
    );
  } else if (option === 3) {
    const inputDescription = document.getElementById("descriptionInput").value;
    document.getElementById("descriptionInput").value = "";
    for (let movie of arrayMovies) {
      if (movie.description.includes(inputDescription)) {
        sortedMovies.push(movie);
      }
    }
  }


  var CardMovie = document.getElementById("col");

  CardMovie.innerHTML = "";

  for (let i = 0; i < sortedMovies.length; i++) {
    let title = sortedMovies[i].title;
    let url = sortedMovies[i].url;
    let price = sortedMovies[i].price;
    let AddCardMovie = document.createElement("div");
    AddCardMovie.classList.add("col");
    AddCardMovie.innerHTML = `
      <div class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="..."></img>
        <div class="card-body">
          <p class="card-text"> <strong>${title}</strong></p>
          <div class="gap-2 justify-content-center align-items-center">
            <div class="btn-group flex-wrap">
              <button type="button" class="text-nowrap" onclick="navigateToPayment('${title}', '11:40 AM', ${price}, '${url}')">11:40 AM</button>
              <button type="button" class="text-nowrap" onclick="navigateToPayment('${title}', '2:10 PM', ${price}, '${url}')">2:10 PM</button>
              <button type="button" class="text-nowrap" onclick="navigateToPayment('${title}', '4:40 PM', ${price}, '${url}')">4:40 PM</button>
              <button type="button" class="text-nowrap" onclick="navigateToPayment('${title}', '7:10 PM', ${price}, '${url}')">7:10 PM</button>
              <button type="button" class="text-nowrap" onclick="navigateToPayment('${title}', '9:40 PM', ${price}, '${url}')">9:40 PM</button>
            </div>
          </div>
        </div>
      </div>
    `;
    CardMovie.appendChild(AddCardMovie);
  }
  
}

function navigateToPayment(title, time, price, url) {
  const numTickets = prompt("Enter the number of tickets:");

  if (isNaN(numTickets) || numTickets <= 0) {
    alert("Please enter a valid number of tickets.");
    return;
  }
  const totalPrice = numTickets * price;
  window.location.href = `payments.html?title=${encodeURIComponent(title)}&time=${encodeURIComponent(time)}&price=${encodeURIComponent(totalPrice)}&url=${encodeURIComponent(url)}&tickets=${encodeURIComponent(numTickets)}`;
}

showCardsSortedByPriceHighLow();