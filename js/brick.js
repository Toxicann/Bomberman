class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;
    this.isDestroyed = false;
    this.currentSpriteSrc = brickSprite;
    this.spriteSrc = { x: this.currentSpriteSrc, y: 0 };
    this.spriteState = 0;
  }

  create() {
    context.drawImage(
      brickImg,
      this.spriteSrc.x[this.spriteState],
      this.spriteSrc.y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * SCALE_FACTOR,
      this.height * BRICK_HEIGHT_SCALE_FACTOR
    );
  }

  checkCollision() {
    if (
      player.x < this.x + this.width * SCALE_FACTOR &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height * SCALE_FACTOR &&
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
        enemy.x < this.x + this.width * SCALE_FACTOR &&
        enemy.x + enemy.width * PLAYER_SCALE_FACTOR > this.x &&
        enemy.y < this.y + this.height * SCALE_FACTOR &&
        enemy.y + enemy.height * PLAYER_SCALE_FACTOR > this.y
      ) {
        enemy.collision = true;
      }
    });
  }

  checkDestruction(index) {
    if (this.isDestroyed) {
      const brickDestructionAnimation = setInterval(() => {
        this.spriteState++;
        if (this.spriteState > 6) {
          clearInterval(brickDestructionAnimation);
          delete brickArrObj[index];
        }
      }, 250);
    }
  }
}
