class Player {
  constructor(x = 50, y = 53) {
    this.playerPos = 1;
    this.x = x;
    this.y = y;
    this.id = "p1";
    this.isAlive = true;
    this.bombs_on_field = 0;
    this.max_bombs_on_field = 1;
    this.speed = SPEED;
    this.currentSpriteSrc = playerMoveDown;
    this.spriteSrc = { x: this.currentSpriteSrc, y: 1 };
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.animationInterval = 0;
    this.playerCollision = false;
  }

  create() {
    // context.save();
    context.drawImage(
      playerImg,
      this.currentSpriteSrc[this.playerPos],
      this.spriteSrc.y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * PLAYER_SCALE_FACTOR,
      this.height * PLAYER_SCALE_FACTOR
    );
  }

  update() {
    this.currentSpriteSrc = playerMoves;
    if (this.animationInterval >= 3) {
      this.playerPos == 2 ? (this.playerPos = 0) : this.playerPos++;
      this.animationInterval = 0;
    } else {
      this.animationInterval++;
    }
  }
}
