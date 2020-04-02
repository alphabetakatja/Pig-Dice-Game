/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

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

// state variable - tells us the state of our condition - gamePlaying - boolean
let scores, roundScore, activePlayer, previousDice, gamePlaying, userInputVal;

function setWinningScore() {
  userInputVal = document.getElementById("user-input").value;
  console.log("userInput value: ", userInputVal);
}

initGame();

// adding and event listener that expects 2 args - the event type and an anonymous fn;
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Generate a random number
    let dice = Math.floor(Math.random() * 6) + 1;
    let diceTwo = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    let diceTwoDOM = document.getElementById("dice-two");
    diceTwoDOM.style.display = "block";
    diceTwoDOM.src = "dice-" + diceTwo + ".png";

    "dice-" + dice === 6
      ? previousDice.push(dice)
      : previousDice.shift(previousDice[0]);
    console.log("previousDice:", previousDice);
    if (previousDice.length == 2) {
      scores[activePlayer] = 0;
      nextPlayer();

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
    // 3. Update the round score only IF the rolled number isn't 1
    else if (dice !== 1 && diceTwo !== 1) {
      // Add score
      roundScore += dice + diceTwo;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Add the current score to the player's global score
    scores[activePlayer] += roundScore;
    // 2. Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // 3. Check if the player won the Game
    if (scores[activePlayer] >= userInputVal) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
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

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector(".dice").style.display = "none";
}

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousDice = [];
  gamePlaying = true;

  setWinningScore();

  // document.querySelector(".dice").style.display = "none";

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
