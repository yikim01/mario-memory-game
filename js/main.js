console.log('activate framework!');

// var randomLoc = Math.floor(Math.random() * 6);
// var location1 = randomLoc;
// var location2 = location1 + 1;
// var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

//Variable declaration go here

// while (isSunk === false) {
//   guess = prompt("Ready, aim, fire!(enter a number 0-7):");
//   if (guess < 0 || guess > 7) {
//     alert("Please enter a valid cell number!");
//   } else {
//     guesses = guesses + 1;

//     if (guess == location1 || guess == location2 || guess == location3) {
//       hits = hits + 1;
//       alert("HIT!");

//       if (hits == 3) {
//         isSunk = true;
//         alert("You sank my battleship!");
//       }
//     } else {
//       alert("MISS!");
//     }
//   }
// }
// var stats = "You took " + guesses + " guesses to sink the battleship, " +
//             "which means your shooting accuracy was " + (3/guesses);
// alert(stats);






var model = {
  boardSize: 8,
  numShips: 4,
  shipLength: 4,
  shipsSunk: 0,

  ships: [
    { location: [0,0,0,0], hits: ["","","",""] },
    { location: [0,0,0,0], hits: ["","","",""] },
    { location: [0,0,0,0], hits: ["","","",""] },
    { location: [0,0,0,0], hits: ["","","",""] } ],

  fire: function(guess) {

    for(var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var location = ship.locations;
      var index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if ( this.isSunk(ship) ) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        return true;

        }
      }
      view.displayMiss(guess) ;
      view.displayMessage("You missed.");
      return false;
    },
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
        }
      }
      return true;
    }
  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
    do {
      locations = this.generateShip();
    } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) { // horizontal
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else { // vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength);
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];

    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

//parse guess from user
  function parseGuess(guess) {
   var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

    if (guess === null || guess.length !==2) {
      alert("Oop, please enter and letter and a number on the board.");
    } else {
      // check the 0 and 1 location grabs the first character of the guess
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);
      // change the numbers for the rows and columns
      if (isNAN(row) || isNAN(column)) {
        alert("oops, that isnt on the board.");
      } else if (row < 0 || row >= model.boardSize ||
        column < 0 || column >= model.boardSize) {
        alert("oops, that's off the board!")
      } else {
        return row + column;
      }
    }
    return null;
//
var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("All ships are sunk")
// message to both player about the amount of guess
      }
    }
  }
};










// Fire! button click
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput =  document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}
function handleFireButton() {
  var guessInput =  document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

function handleKeyPress (e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}











