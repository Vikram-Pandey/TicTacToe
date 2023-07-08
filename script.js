const form = document.getElementById("playerDetailForm");
const submit = document.getElementById("formSubmit"); //gameBoard
const gameBoardElement = document.getElementById("gameBoard");
const reset = document.getElementById("formReset");
const resultElement = document.getElementById("resultContainer");
//const gridContainer = document.getElementById("resultContainer");

let flag = true;

submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (flag) {
    gameModule.start();
    flag = false;
  }
});

reset.addEventListener("click", () => {
  gameBoardElement.innerText = "";
  gameBoardElement.innerHTML = "";
  gameModule.currentPlayerIndex = 0;
  gameBoardModule.lastupdateArr = [];
  gameBoardElement.classList.remove("blur");
  resultContainer.innerText = "";
  gameBoardModule.emptyTheBoard();
});

const gameBoardModule = (() => {
  const gameboardArr = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    for (let i = 0; i < gameboardArr.length; i++) {
      const gridItem = document.createElement("div");
      gridItem.id = i;
      gridItem.innerText = gameboardArr[i];
      gridItem.className = "item";
      gridItem.addEventListener("click", gameModule.handleClick);
      gameBoardElement.appendChild(gridItem);
    }
  };

  let lastupdateArr = [];
  let count = 0;
  const updateBoard = (index, marker) => {
    console.log("updateBoard");
    if (!lastupdateArr.includes(index)) {
      gameboardArr.splice(index, 1, marker);
      gameBoardElement.innerHTML = "";
      count++;
      render();
    }
    lastupdateArr.push(index);
  };

  const emptyTheBoard = () => {
    for (let i = 0; i < gameboardArr.length; i++) {
      gameboardArr.splice(i, 1, "");
    }
    lastupdateArr = [];
    render();
  };

  let combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (player) => {
    for (let i = 0; i < combs.length; i++) {
      let val = combs[i];
      if (
        gameboardArr[val[0]] != "" &&
        gameboardArr[val[0]] == gameboardArr[val[1]] &&
        gameboardArr[val[0]] == gameboardArr[val[2]] &&
        gameboardArr[val[0]] == player.marker
      ) {
        console.log(`${player.name} has won`);
        return true;
      }
    }
    return false;
  };

  return { render, updateBoard, emptyTheBoard, lastupdateArr, checkWinner };
})();

const gameModule = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  const start = () => {
    players = [
      playerFactory(document.getElementById("player1").value, "X"),
      playerFactory(document.getElementById("player2").value, "O"),
    ];
    gameBoardModule.render();
  };

  const handleClick = (event) => {
    if (currentPlayerIndex % 2 == 0) {
      cindex = 0;
    } else {
      cindex = 1;
    }
    currentPlayerIndex++;
    if (currentPlayerIndex == 9) {
      currentPlayerIndex = 0;
    }
    let mark = players[cindex].marker;
    let index = event.target.id;
    console.log(index);
    gameBoardModule.updateBoard(index, mark);
    if (gameBoardModule.checkWinner(players[cindex])) {
      resultElement.innerText =
        players[cindex].name +
        " With marker " +
        players[cindex].marker +
        " has won ";
      gameBoardElement.classList.add("blur");
      console.log("Winner Found");
      return;
    }
  };

  return { start, handleClick, currentPlayerIndex };
})();

const playerFactory = (name, marker) => {
  return { name, marker };
};
