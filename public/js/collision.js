/**
 * Check for collisions between the player and the walls, bricks, door, and enemies.
 */
const collision = () => {
  strWallArrObj.forEach((wall, index) => {
    if (player != undefined) {
      if (
        player.x + collisionRadius > wall.x ||
        player.x - collisionRadius < wall.x + wall.width ||
        player.y + collisionRadius > wall.y ||
        player.y - collisionRadius < wall.y + wall.height
      ) {
        wall.checkCollision();
      }
    }

    enemyObjArr.forEach((enemy) => {
      if (
        enemy.x + collisionRadius > wall.x ||
        enemy.x - collisionRadius < wall.x + wall.width ||
        enemy.y + collisionRadius > wall.y ||
        enemy.y - collisionRadius < wall.y + wall.height
      ) {
        wall.checkEnemyCollision();
      }
    });

    wall.checkBombCollision(index);
  });

  brickArrObj.forEach((brick, index) => {
    if (player != undefined) {
      if (
        player.x + collisionRadius > brick.x ||
        player.x - collisionRadius < brick.x + brick.width ||
        player.y + collisionRadius > brick.y ||
        player.y - collisionRadius < brick.y + brick.height
      ) {
        brick.checkCollision();
      }
    }

    enemyObjArr.forEach((enemy) => {
      if (
        enemy.x + collisionRadius > brick.x ||
        enemy.x - collisionRadius < brick.x + brick.width ||
        enemy.y + collisionRadius > brick.y ||
        enemy.y - collisionRadius < brick.y + brick.height
      ) {
        brick.checkEnemyCollision();
      }
    });
    brick.checkDestruction(index);
    brick.checkBombCollision(index);
    brick.checkExplosionCollision(index);
  });

  if (door != undefined) {
    if (
      player.x + collisionRadius > door.x ||
      player.x - collisionRadius < door.x + door.width ||
      player.y + collisionRadius > door.y ||
      player.y - collisionRadius < door.y + door.height
    ) {
      door.checkDoorCollision();
    }
  }

  if (powerups != undefined) {
    if (
      player.x + collisionRadius > powerups.x ||
      player.x - collisionRadius < powerups.x + powerups.width ||
      player.y + collisionRadius > powerups.y ||
      player.y - collisionRadius < powerups.y + powerups.height
    ) {
      powerups.collisionCheck();
    }
  }

  enemyObjArr.forEach((enemy, index) => {
    if (player != undefined) {
      if (
        player.x + collisionRadius > enemy.x ||
        player.x - collisionRadius < enemy.x + enemy.width ||
        player.y + collisionRadius > enemy.y ||
        player.y - collisionRadius < enemy.y + enemy.height
      ) {
        enemy.checkCollision(index);
      }
    }

    if (bombArrObj.length > 0) {
      enemy.checkBombCollision(index);
    }
  });

  explosionObjArr.forEach((explosion) => {
    if (player != undefined) {
      explosion.checkCollision();
    }

    explosion.checkEnemyCollision();
  });
};
