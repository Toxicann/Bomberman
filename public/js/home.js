const homeScreen = document.getElementById("home");

const newGame = document.getElementById("start");
const loadGame = document.getElementById("load");
const createGame = document.getElementById("create");

let startFlag = false;
getHighScore();

window.onload = () => {
  titleScreen.play();
};

/**
 * When the start button is clicked, the home screen is hidden, the canvas is displayed, the game info
 * is displayed, the start flag is set to true, and the check flag function is called.
 */
const start = () => {
  homeScreen.style.display = "none";
  canvas.style.display = "block";
  gameInfo.style.display = "flex";
  startFlag = true;
  titleScreen.pause();
  titleScreen.currentTime = 0;
  checkFlag();
  playerDeathInterval();
  animate();
};
