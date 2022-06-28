/* Listening for keydown events and then executing the code inside the switch statement. */
addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "KeyD":
      player.x += player.speed;
      playerMoves = playerMoveRight;
      collision();
      if (player.playerCollision) {
        player.x -= SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;

    case "KeyA":
      player.x -= player.speed;
      playerMoves = playerMoveLeft;
      collision();
      if (player.playerCollision) {
        player.x += SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;

    case "KeyW":
      player.y -= player.speed;
      playerMoves = playerMoveUp;
      collision();
      if (player.playerCollision) {
        player.y += SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;

    case "KeyS":
      player.y += player.speed;
      playerMoves = playerMoveDown;
      collision();
      if (player.playerCollision) {
        player.y -= SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;

    case "Space":
      isLeftClear = true;
      isRightClear = true;
      isTopClear = true;
      isBottomClear = true;
      plantBomb();
      break;

    //testing below
    case "KeyL":
      enemy.update();
      collision();
      break;

    case "KeyZ":
      player.checkDeath();
      break;

    case "KeyP":
      brickArrObj.forEach((brick) => {
        brick.isDestroyed = true;
      });
      break;
    //testing above
  }
});

//buttons Event Listeners below
newGame.addEventListener("click", start);

createGame.addEventListener("click", create);

loadGame.addEventListener("click", load);

canvas.addEventListener("click", (event) => {
  createTiles(event);
});

remove.addEventListener("click", (event) => {
  deleteTile(event);
  toggleDelete();
});

wallTile.addEventListener("click", (event) => {
  selectWall(event);
});

doorTile.addEventListener("click", (event) => {
  selectDoor(event);
});

brickTile.addEventListener("click", (event) => {
  selectBrick(event);
});

playerEntity.addEventListener("click", (event) => {
  selectPlayer(event);
});

enemyEntity.addEventListener("click", (event) => {
  selectEnemy(event);
});

clearMap.addEventListener("click", () => {
  initializeGame();
});

saveMap.addEventListener("click", () => {
  saveMapEntities();
});

exit.addEventListener("click", () => {
  goHome();
});
