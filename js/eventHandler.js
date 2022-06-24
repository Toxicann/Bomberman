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

    //testing
    case "KeyL":
      enemy.update();
      // playerMoves = playerMoveRight;
      collision();
      // if (player.playerCollision) {
      //   player.x -= SPEED;
      //   player.playerCollision = false;
      // }
      // player.update();
      break;

    //testing above
    case "Space":
      plantBomb();
      break;

    case "KeyZ":
      player.checkDeath();
      break;
  }
});
