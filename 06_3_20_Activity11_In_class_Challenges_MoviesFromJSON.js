/**Caleb Iddings
 * ciddings@iastate.edu
 * Oct 2, 2024
 */

function showCardsContainingDescriptionA() {
  const inputField = document.getElementById("inputField");
  inputField.style.display = "block";
}

function showCardsContainingDescriptionB() {
  fetch("./MoviesFromJSON.json")
    .then((response) => response.json())
    .then((myMovies) => loadMovies(myMovies, 3))
    .catch((err) => console.log("Error :" + err));
}

function showCardsSortedByPriceLowHigh() {
  fetch("./MoviesFromJSON.json")
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
  fetch("./MoviesFromJSON.json")
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
    document.getElementById("inputField").style.display = "none";
    for (let movie of arrayMovies) {
      if (movie.description.includes(inputDescription)) {
        sortedMovies.push(movie);
      }
    }
  }

  //const m = document.getElementById("selectedMovie");
  //const inputMovieName = m.value;
  var CardMovie = document.getElementById("col");

  // Clear previous movie data
  CardMovie.innerHTML = "";

  for (let i = 0; i < sortedMovies.length; i++) {
    let title = sortedMovies[i].title;
    let year = sortedMovies[i].year;
    let url = sortedMovies[i].url;
    let price = sortedMovies[i].price;
    // construct the HTML element
    let AddCardMovie = document.createElement("div");
    AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
    AddCardMovie.innerHTML = `
  <div class="card shadow-sm">
  <img src=${url} class="card-img-top" alt="..."></img>
  <div class="card-body">
  <p class="card-text"> <strong>${title}</strong>, ${year}</p>
  </div>
  </div>
  `;
    CardMovie.appendChild(AddCardMovie);
    // end of if
  } // end of for

  
}
