class StrongWall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = gridCol;
    this.height = gridRow;
  }

  create() {
    context.drawImage(strongWallImg, this.x, this.y, this.width, this.height);
  }

  checkCollision() {
    if (
      player.x < this.x + this.width &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      player.speed = 0;
      player.playerCollision = true;
    } else {
      player.speed = SPEED;
    }
  }

  checkEnemyCollision() {
    enemyObjArr.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width * PLAYER_SCALE_FACTOR > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height * PLAYER_SCALE_FACTOR > this.y
      ) {
        enemy.collision = true;
      }
    });
  }
}
