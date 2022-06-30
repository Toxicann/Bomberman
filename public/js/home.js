getHighScore();

/* Playing the title screen music when the window loads. */
window.onload = () => {
  titleScreen.play();
};

/**
 * When the start button is clicked, the game starts.
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
