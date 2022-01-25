function main() {
  const numArray4 = [1, 2, 3, 4, 5, 4, 3, 2, 1, 5, 6, 7, 8, 8, 6, 7]; // 4x4 array
  const numArray6 = [
    1, 2, 3, 4, 5, 4, 3, 2, 1, 5, 6, 7, 8, 8, 6, 7, 18, 17, 16, 15, 14, 13, 12,
    11, 10, 9, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9,
  ]; // 6x6 array

  const iconArray4 = [
    `<i class="fas fa-ambulance"></i>`,
    `<i class="fab fa-accessible-icon"></i>`,
    `<i class="fab fa-amazon"></i>`,
    `<i class="fab fa-apple"></i>`,
    `<i class="fas fa-atlas"></i>`,
    `<i class="fas fa-balance-scale"></i>`,
    `<i class="fas fa-bell"></i>`,
    `<i class="fab fa-blackberry"></i>`,
    `<i class="fas fa-ambulance"></i>`,
    `<i class="fab fa-accessible-icon"></i>`,
    `<i class="fab fa-amazon"></i>`,
    `<i class="fab fa-apple"></i>`,
    `<i class="fas fa-atlas"></i>`,
    `<i class="fas fa-balance-scale"></i>`,
    `<i class="fas fa-bell"></i>`,
    `<i class="fab fa-blackberry"></i>`,
  ];

  const iconArray6 = [
    `<i class="fas fa-ambulance"></i>`,
    `<i class="fab fa-accessible-icon"></i>`,
    `<i class="fab fa-amazon"></i>`,
    `<i class="fab fa-apple"></i>`,
    `<i class="fas fa-atlas"></i>`,
    `<i class="fas fa-balance-scale"></i>`,
    `<i class="fas fa-bell"></i>`,
    `<i class="fab fa-blackberry"></i>`,
    `<i class="fas fa-bug"></i>`,
    `<i class="fas fa-camera"></i>`,
    `<i class="fab fa-cc-visa"></i>`,
    `<i class="fas fa-clinic-medical"></i>`,
    `<i class="fas fa-compass"></i>`,
    `<i class="fas fa-couch"></i>`,
    `<i class="far fa-copy"></i>`,
    `<i class="fas fa-database"></i>`,
    `<i class="fab fa-git"></i>`,
    `<i class="fab fa-grunt"></i>`,
    `<i class="fas fa-ambulance"></i>`,
    `<i class="fab fa-accessible-icon"></i>`,
    `<i class="fab fa-amazon"></i>`,
    `<i class="fab fa-apple"></i>`,
    `<i class="fas fa-atlas"></i>`,
    `<i class="fas fa-balance-scale"></i>`,
    `<i class="fas fa-bell"></i>`,
    `<i class="fab fa-blackberry"></i>`,
    `<i class="fas fa-bug"></i>`,
    `<i class="fas fa-camera"></i>`,
    `<i class="fab fa-cc-visa"></i>`,
    `<i class="fas fa-clinic-medical"></i>`,
    `<i class="fas fa-compass"></i>`,
    `<i class="fas fa-couch"></i>`,
    `<i class="far fa-copy"></i>`,
    `<i class="fas fa-database"></i>`,
    `<i class="fab fa-git"></i>`,
    `<i class="fab fa-grunt"></i>`,
  ];

  const modalMenuControl = document.querySelector(".modal-menu-control");
  const container = document.querySelector(".container");
  const restartButtons = document.querySelectorAll(".restart-button");
  let resumeGameBtn = document.querySelector(".resume-game-button");
  let resetBtn = document.querySelector(".reset-button");
  const setupNewGameButtons = document.querySelectorAll(
    ".setup-new-game-button"
  );
  const menuSettings = document.querySelector(".secondary-menu-button");

  let selectFour = true; // grid size selector 4X4 or 6X6
  let inProgress = false; // to start the game
  let gameEnd = false;
  let restartGame = false;
  let isPaused = false;
  let selectedTheme = "num";
  let selectedGrid = "";
  let selectedPlayer = 1;

  let lonePlayer = true;
  let doublePlayer = false;
  let trioPlayer = false;
  let quadPlayer = false;

  let tempArray = []; // to hold a max of 2 cards to be matched and reset to empty.
  let stepCount = 0; // count the number of moves during the game
  let count = 0; // used to find if all combinations has been meet to win the game at (array.length / 2)
  let sec = 0;
  let min = 0;
  let interval;
  let tempIndex = 0;
  const mediaQuery = window.matchMedia("(min-width: 38.75rem)");

  const scorecard = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0,
  };

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document
        .querySelector(".game-section")
        .classList.add("modal-menu-toggle");
      document
        .querySelector(".modal-start")
        .classList.remove("hide-modal-menu-control");
      document.querySelector(".overlay").classList.remove("overlay-show");
      resetGame();
      selectTheme();
      selectGridSize();
      shufflePlayCards();
      populateBoard();
      myTimer();
    });
  }

  restartButtons.forEach((restartButton) => {
    restartButton.addEventListener("click", () => {
      document.querySelector(".overlay").classList.remove("overlay-show");
      document
        .querySelector(".game-section")
        .classList.add("modal-menu-toggle");
      resetGame();
      restartGame = true;
      startGame();
    });
  });

  if (modalMenuControl) {
    modalMenuControl.addEventListener("click", () => {
      document
        .querySelector(".modal-start")
        .classList.add("hide-modal-menu-control");
      container.innerHTML = "";
      shufflePlayCards();
      populateBoard();
      startGame();
    });
  }

  function resetGame() {
    const modal = document.querySelector(".modal-end");
    const stepsTaken = document.querySelector(".stepsCount");
    const cards = Array.from(document.querySelectorAll(".game-buttons"));
    const scoreElement = Array.from(document.querySelectorAll(".score"));

    tempArray = [];
    count = 0;
    stepCount = 0;
    sec = 0;
    min = 0;
    inProgress = false;
    gameEnd = false;
    restartGame = false;
    isPaused = false;

    scorecard.player1 = 0;
    scorecard.player2 = 0;
    scorecard.player3 = 0;
    scorecard.player4 = 0;

    clearInterval(interval);
    modal.classList.add("hide");
    // Warning stepsTaken == ! null
    if (stepsTaken !== null) {
      stepsTaken.innerHTML = `00`;
    } else {
      return;
    }

    cards.forEach((elem) => {
      elem.classList.remove("open-cards");
      elem.classList.remove("match");
      elem.classList.add("disable-cards");
    });

    scoreElement.forEach((elm) => (elm.innerHTML = 0));
  }

  // Shuffle the cards
  function shufflePlayCards() {
    shuffle(numArray4);
    shuffle(numArray6);
    shuffle(iconArray4);
    shuffle(iconArray6);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Create board elements and append the elements to the container
  const createBoardElements = (el) => {
    const button = document.createElement("button");
    button.classList.add("game-buttons");
    button.innerHTML = el;
    button.setAttribute("aria-label", el);
    // let span = document.createElement("span");
    // button.appendChild(span);
    // container.setAttribute("tabindex", "-1");
    // container.focus();
    container.appendChild(button);
  };

  // Single player template
  const singlePlayerTemplate = `<div class="time-keeper border-radius">
        <h3 class="time-title">Time</h3>
        <div class="time-record">
             <span id="minute">00</span>
             <span id="divider">:</span>
             <span id="seconds">00</span>
        </div>
     </div>
     <div class="steps-time-taken border-radius">
          <h3 class="steps-title">Moves</h3>
          <span class="stepsCount">00</span>
      </div>`;

  // Two players template
  const doublePlayerTemplate = `<div class="players flex2">
         <h3 class="sr-only">2 players involved in this game</h3>
        
         <div data-id="1" class="player player1 active-player">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 1" : "P1"
             }</h4>
             <p class="score score1">0</p>
         </div>
         <div data-id="2" class="player player2">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 2" : "P2"
             }</h4>
             <p class="score score2">0</p>
         </div>
    </div>`;

  // Three players template
  const triplePlayerTemplate = `<div class="players flex2">
         <h3 class="sr-only">2 players involved in this game</h3>
         <div data-id="1" class="player player1 active-player">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 1" : "P1"
             }</h4>
             <p class="score score1">0</p>
         </div>
         <div data-id="2" class="player player2">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 2" : "P2"
             }</h4>
             <p class="score score2">0</p>
         </div>
         <div data-id="3" class="player player3">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 3" : "P3"
             }</h4>
             <p class="score score3">0</p>
         </div>
    </div>`;

  // Four players template
  const quadPlayerTemplate = `<div class="players flex2">
         <h3 class="sr-only">2 players involved in this game</h3>
         <div data-id="1" class="player player1 active-player">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 1" : "P1"
             }</h4>
             <p class="score score1">0</p>
         </div>
         <div data-id="2" class="player player2">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 2" : "P2"
             }</h4>
             <p class="score score2">0</p>
         </div>
         <div data-id="3" class="player player3">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 3" : "P3"
             }</h4>
             <p class="score score3">0</p>
         </div>
         <div data-id="4" class="player player4">
             <h4 class="player-title">${
               mediaQuery.matches ? "Player 4" : "P4"
             }</h4>
             <p class="score score4">0</p>
         </div>
    </div>`;

  // Select numbers or icons to play the game
  const selectTheme = () => {
    const themes = document.getElementsByName("theme");
    for (const theme of themes) {
      if (theme.checked) {
        selectedTheme = theme.value;
      }
    }
  };

  // Select grid size
  const selectGridSize = () => {
    const gridSize = document.getElementsByName("gridSize");
    for (const grid of gridSize) {
      if (grid.checked) {
        selectedGrid = grid.value;
      }
    }
  };

  // Select number of players
  const selectNumPlayers = () => {
    const players = document.getElementsByName("players");

    for (const player of players) {
      if (player.checked) {
        selectedPlayer = parseInt(player.value);
      }
    }
  };

  const populateBoard = () => {
    selectTheme();
    selectGridSize();
    shufflePlayCards();
    selectNumPlayers();

    if (selectedTheme === "num") {
      if (selectedGrid === "4") {
        selectFour = true;
        container.classList.add("containerGrid4");
        container.classList.remove("containerGrid6");
        numArray4.forEach((num) => {
          createBoardElements(num);
        });
      } else {
        selectFour = false;
        container.classList.add("containerGrid6");
        container.classList.remove("containerGrid4");
        numArray6.forEach((num) => {
          createBoardElements(num);
        });
      }
    } else {
      if (selectedGrid === "4") {
        selectFour = true;
        container.classList.add("containerGrid4");
        container.classList.remove("containerGrid6");
        iconArray4.forEach((icon) => {
          createBoardElements(icon);
        });
      } else {
        selectFour = false;
        container.classList.add("containerGrid6");
        container.classList.remove("containerGrid4");
        iconArray6.forEach((icon) => {
          createBoardElements(icon);
        });
      }
    }
  };

  populateBoard();

  function startGame() {
    const timeStepsRecord = document.querySelector(".time-steps-record");

    // Warning inProgress == true
    if (inProgress === true) {
      return;
    } else {
      stepCount = 0;
    }
    // Warning gameEnd == true
    if (gameEnd === true) {
      return;
    }

    if (selectedPlayer === 1) {
      timeStepsRecord.innerHTML = singlePlayerTemplate;
      startTimer();
      inProgress = true;
      lonePlayer = true;
      doublePlayer = false;
      trioPlayer = false;
      quadPlayer = false;
      playGame();
    } else if (selectedPlayer === 2) {
      timeStepsRecord.innerHTML = doublePlayerTemplate;
      inProgress = true;
      lonePlayer = false;
      doublePlayer = true;
      trioPlayer = false;
      quadPlayer = false;
      playGame();
    } else if (selectedPlayer === 3) {
      timeStepsRecord.innerHTML = triplePlayerTemplate;
      inProgress = true;
      lonePlayer = false;
      doublePlayer = false;
      trioPlayer = true;
      quadPlayer = false;
      playGame();
    } else if (selectedPlayer === 4) {
      timeStepsRecord.innerHTML = quadPlayerTemplate;
      inProgress = true;
      lonePlayer = false;
      doublePlayer = false;
      trioPlayer = false;
      quadPlayer = true;
      playGame();
    }
  }

  const playGame = () => {
    if (inProgress) {
      const cards = Array.from(document.querySelectorAll(".game-buttons"));
      cards.forEach((elem) => {
        elem.classList.remove("disable-cards");
        elem.addEventListener("click", function (event) {
          if (elem.classList.contains("open-cards")) {
            return;
          } else {
            elem.classList.add("open-cards");
            compareCards(event.target);
          }
        });
      });
    }
  };

  const stepsTimerChecker = (numberOfSteps) => {
    const stepsTaken = document.querySelector(".stepsCount");
    numberOfSteps < 10
      ? (stepsTaken.innerHTML = `0${numberOfSteps}`)
      : (stepsTaken.innerHTML = `${numberOfSteps}`);
  };

  const numberOfPlayers = () => {
    const players = Array.from(document.querySelectorAll(".player"));

    players.forEach((player, index) => {
      player.classList.remove("active-player");
    });

    if (tempIndex < players.length - 1) {
      tempIndex += 1;
    } else {
      tempIndex = 0;
    }
    players[tempIndex].classList.add("active-player");
  };

  const playersScore = () => {
    if (!lonePlayer) {
      const players = Array.from(document.querySelectorAll(".player"));
      let targetDiv;
      let id;
      let calcID;
      for (const player of players) {
        if (player.classList.contains("active-player")) {
          targetDiv = player;
          id = targetDiv.getAttribute("data-id");
        }
      }

      const scoreUpdate = document.querySelector(`.score${id}`);
      calcID = `player${id}`;
      scorecard[calcID] = scorecard[calcID] += 1;
      scoreUpdate.innerHTML = scorecard[calcID];
    }
  };

  function compareCards(currNum) {
    if (tempArray.length <= 2) {
      tempArray.push(currNum);
    }

    if (tempArray.length === 2) {
      stepCount += 1;

      if (lonePlayer) {
        stepsTimerChecker(stepCount);
      }

      if (tempArray[0].innerHTML === tempArray[1].innerHTML) {
        tempArray[0].classList.add("match");
        tempArray[1].classList.add("match");
        tempArray = [];
        playersScore();
        endGame();
      } else {
        setTimeout(function () {
        //   tempArray[0].classList.toggle("open-cards");
        //   tempArray[1].classList.toggle("open-cards");
          tempArray[0].classList.remove("open-cards");
          tempArray[1].classList.remove("open-cards");
          tempArray = [];
        }, 500);
        if (lonePlayer === false) {
          numberOfPlayers();
        }
      }
    }
  }

  function startTimer() {
    if (inProgress === false) {
      interval = setInterval(myTimer, 1000);
    } else {
      return;
    }
  }

  function myTimer() {
    const overlay = document.querySelector(".overlay");
    const modalEnd = document.querySelector(".modal-end");
    const gameResults = document.querySelector(".game-results");
    const minHand = document.getElementById("minute");
    const secHand = document.getElementById("seconds");

    sec++;
    if (sec > 59) {
      min++;
      sec = 0;
    }

    // minHand and secHand can be null if the singleTemplate was not selected
    if (minHand === null || secHand === null) {
      return;
    }

    if (sec < 10) {
      minHand.innerHTML = `0${min}`;
      secHand.innerHTML = `0${sec}`;
      // fullTime = `0${min}:0${sec}`;
    } else {
      minHand.innerHTML = `0${min}`;
      secHand.innerHTML = `${sec}`;
      // fullTime = `0${min}:${sec}`;
    }

    if (min >= 5) {
      resetGame();
      modalEnd.classList.remove("hide");
      overlay.classList.add("overlay-show");

      gameResults.innerHTML = ` <h3 class="modal-end-title">Game over. Mission not complete</h3>
        <p class="modal-end-content">Better lucky next time</p>
        <div class="time-taken" aria-live="assertive">
               <span class="time-taken-label">Time taken</span>
               <span class="time-taken-value">05:00</span>
        </div>
        <div class="steps-taken" aria-live="assertive">
               <span class="steps-taken-label">Moves taken</span>
               <span class="steps-taken-value">${stepCount} Moves</span>
        </div>`;
    }
  }

  function endGame() {
    const cards = Array.from(document.querySelectorAll(".game-buttons"));
    const modalEnd = document.querySelector(".modal-end");
    const gameResults = document.querySelector(".game-results");
    const arrayLength =
      selectFour === true ? numArray4.length : numArray6.length;
    const gameResultsModal = document.querySelector(".setup-restart");
    let timeMessage = "";
    const overlay = document.querySelector(".overlay");
    if (count < arrayLength / 2) {
      count = count + 1;
    }

    if (sec < 10) {
      timeMessage = `0${min}:0${sec}`;
    } else {
      timeMessage = `0${min}:${sec}`;
    }

    if (count === arrayLength / 2) {
      if (lonePlayer) {
        gameResults.innerHTML = ` <h3 class="modal-end-title">You did it!</h3>
           <p class="modal-end-content">Game over. Here is how you got on...</p>
           <div class="time-taken" aria-live="assertive">
                  <span class="time-taken-label">Time taken</span>
                  <span class="time-taken-value">${timeMessage}</span>
           </div>
           <div class="steps-taken" aria-live="assertive">
                  <span class="steps-taken-label">Moves taken</span>
                  <span class="steps-taken-value">${stepCount}</span>
           </div>`;

        overlay.classList.add("overlay-show");
        gameResultsModal.focus();
      } else {
        const playerListScores = Array.from(
          document.querySelectorAll(".player")
        );

        let entries = Object.entries(scorecard);
        let sorted = entries.sort((a, b) => b[1] - a[1]);
        overlay.classList.add("overlay-show");
        gameResults.innerHTML = `
            <h3 class="modal-end-title">We have a winner!!</h3>
            <p class="modal-end-content">Game over! Here are the results...</p>
            `;

        playerListScores.forEach((element, idk) => {
          const max = sorted[0][1];

          if (sorted[idk][1] === max) {
            gameResults.innerHTML += `<div class="multiple-player-results winning-player">
                             <h4 class="player-title">Player ${sorted[
                               idk
                             ][0].slice(
                               sorted[idk][0].length - 1
                             )} (winner!)</h4> 
                              <p class="players-content">${
                                sorted[idk][1]
                              } pairs</p>
                         </div> `;
          } else {
            gameResults.innerHTML += `<div class="multiple-player-results">
                             <h4 class="player-title">Player ${sorted[
                               idk
                             ][0].slice(sorted[idk][0].length - 1)}</h4> 
                             <p class="players-content">${
                               sorted[idk][1]
                             } pairs</p>
                         </div> `;
          }

          if (sorted[1][1] === sorted[0][1]) {
            return (document.querySelector(".modal-end-title").innerHTML =
              "It is a tie");
          }

          if (sorted[1][1] !== sorted[0][1]) {
            const str = sorted[0][0].slice(0, sorted[0][0].length - 1);
            const strNum = sorted[0][0].slice(sorted[0][0].length - 1);
            return (document.querySelector(
              ".modal-end-title"
            ).innerHTML = `${str} ${strNum} is the winner`);
          }
        });
      }

      cards.forEach((elem) => {
        if (elem.classList.contains("open-cards")) {
          return;
        } else {
          elem.classList.add("open-cards");
        }
      });

      inProgress = false;
      gameEnd = true;
      clearInterval(interval);
      modalEnd.classList.toggle("hide");
      gameResultsModal.focus();
      cards.forEach((elem) => {
        elem.removeEventListener("click", function (event) {
          return;
        });
      });
    }
  }

  setupNewGameButtons.forEach((setupNewGameButton) => {
    const modalStart = document.querySelector(".modal-start");
    setupNewGameButton.addEventListener("click", function () {
      const modalEnd = document.querySelector(".modal-end");
      document
        .querySelector(".modal-start")
        .classList.remove("hide-modal-menu-control");
      const overlay = document.querySelector(".overlay");
      overlay.classList.remove("overlay-show");
      modalEnd.classList.add("hide");
      modalStart.focus();
      resetGame();
      myTimer();
    });
  });

  if (menuSettings) {
    menuSettings.addEventListener("click", () => {
      resumePausedGame();
    });
  }

  if (resumeGameBtn) {
    resumeGameBtn.addEventListener("click", () => {
      resumePausedGame();
    });
  }

  const resumePausedGame = () => {
    const overLay = document.querySelector(".overlay");
    document
      .querySelector(".game-section")
      .classList.toggle("modal-menu-toggle");
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(interval);
      overLay.classList.add("overlay-show");
    } else {
      interval = setInterval(myTimer, 1000);
      overLay.classList.remove("overlay-show");
    }
  };

  // Modal tab trapping
  const modalFirst = document.querySelector(".modal-start");

  if (modalFirst) {
    modalFirst.addEventListener("keydown", (e) => {
      tabTrapping(`[data-modal="intro"]`, e);
    });
  }

  const setupRestartModal = document.querySelector(".setup-restart");

  if (setupRestartModal) {
    setupRestartModal.addEventListener("keydown", (e) => {
      tabTrapping(".restart-setup-btn", e);
    });
  }

  const tabTrapping = (targetElement, e) => {
    const focusables = document.querySelectorAll(targetElement);
    const firstFocus = focusables[0];
    const lastFocus = focusables[focusables.length - 1];

    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocus) {
        lastFocus.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocus) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocus.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  };
}

window.__initializeWindowEvents__ = main;
