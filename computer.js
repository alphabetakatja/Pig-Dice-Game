/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that
they can change the predefined score of 100. (Hint: you can read that value with the .value property
in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses
his current score when one of them is a 1. (Hint: you will need CSS to position the second dice,
so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying;

let diceOneDOM = document.getElementById("dice-one");
let diceTwoDOM = document.getElementById("dice-two");

initGame();

// function hideDice() {
//   diceOneDOM.style.display = "none";
//   diceTwoDOM.style.display = "none";
// }

// adding and event listener that expects 2 args - the event type and an anonymous fn;
document.querySelector(".btn-roll").addEventListener("click", function() {
  // maybe play with closures here...
  if (activePlayer === 0) {
    rollDice();
  }
  while (activePlayer === 1 && roundScore < 20) {
    rollDice();
  }
  if (activePlayer === 1 && roundScore >= 20) {
    console.log("over 20points player2!");
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Add the current score to the player's global score
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // 3. Set the winning score
    let userInputVal = document.querySelector(".user-input").value;
    console.log(userInputVal);
    let winningScore;

    if (userInputVal) {
      winningScore = userInputVal;
    } else {
      winningScore = 100;
    }

    // 4. Check if the player won the Game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";

      // hideDice();

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      // restart game
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", initGame);

function rollDice() {
  if (gamePlaying) {
    let diceOne = Math.floor(Math.random() * 6) + 1;
    let diceTwo = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    diceOneDOM.style.display = "block";
    diceTwoDOM.style.display = "block";

    diceOneDOM.src = "dice-" + diceOne + ".png";
    diceTwoDOM.src = "dice-" + diceTwo + ".png";

    // 3. Update the round score only IF the rolled number is NOT 1
    if (diceOne !== 1 && diceTwo !== 1) {
      // Add score
      roundScore += diceOne + diceTwo;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // hideDice();
}

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hideDice();

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // change back the names of the players
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
