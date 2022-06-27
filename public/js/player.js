class Player {
  /**
   * This function is a constructor for the player class,
   *  it sets the player's position, sprite,x and y coordinates,
   *  id, whether or not the player is alive, the number of bombs on the field,
   *  the maximum number of bombs on the field, the speed,
   * the current sprite source, the sprite source,
   * the width, the height, the animation interval, and the player collision.
   * @param x - x position of the player
   * @param y - y position of the player
   */
  constructor(x, y) {
    this.playerPos = 0;
    this.playerSprite = 0;
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

  /**
   * It draws the player sprite to the canvas.
   */
  create() {
    // context.save();
    context.drawImage(
      playerSprite[this.playerSprite],
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

  /**
   * If the player is alive, then the current sprite source is set to the playerMoves array, and if the
   * animation interval is greater than or equal to 3, then the player position is set to 0 or
   * incremented by 1, and the animation interval is set to 0, otherwise the animation interval is incremented by 1.
   */
  update() {
    if (this.isAlive) {
      this.currentSpriteSrc = playerMoves;
      if (this.animationInterval >= 3) {
        this.playerPos == 2 ? (this.playerPos = 0) : this.playerPos++;
        this.animationInterval = 0;
      } else {
        this.animationInterval++;
      }
    }
  }

  /**
   * If the player is dead, set the player's position to 0, set the player's sprite to 1, set the
   * current sprite source to the player death sprite, and then animate the player's death.
   */
  checkDeath() {
    if (!this.isAlive) {
      this.playerPos = 0;
      this.playerSprite = 1;
      this.currentSpriteSrc = playerDeathSprite;
      const playerDeathAnimation = setInterval(() => {
        this.playerPos++;
        if (this.playerPos > 6) {
          clearInterval(playerDeathAnimation);
        }
      }, 250);
    }
  }
}
