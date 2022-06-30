/* Listening for keydown events and then executing the code inside the switch statement. */
addEventListener("keydown", ({ code }) => {
  if (player.isAlive) {
    switch (code) {
      case "KeyD":
        player.x += player.speed;
        playerMoves = playerMoveRight;
        WALK.play();
        collision();
        if (player.playerCollision) {
          player.x -= player.speed;
          player.playerCollision = false;
        }
        player.update();
        break;

      case "KeyA":
        player.x -= player.speed;
        playerMoves = playerMoveLeft;
        WALK.play();
        collision();
        if (player.playerCollision) {
          player.x += player.speed;
          player.playerCollision = false;
        }
        player.update();
        break;

      case "KeyW":
        player.y -= player.speed;
        playerMoves = playerMoveUp;
        WALK.play();
        collision();
        if (player.playerCollision) {
          player.y += player.speed;
          player.playerCollision = false;
        }
        player.update();
        break;

      case "KeyS":
        player.y += player.speed;
        playerMoves = playerMoveDown;
        WALK.play();
        collision();
        if (player.playerCollision) {
          player.y -= player.speed;
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
      case "KeyP":
        brickArrObj.forEach((brick) => {
          brick.isDestroyed = true;
        });
        break;

      case "KeyO":
        enemyObjArr.forEach((enemy) => {
          enemy.isAlive = false;
        });
        break;
      //testing above
    }
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
