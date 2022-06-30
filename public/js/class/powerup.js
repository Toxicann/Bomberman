class Powerup {
  /**
   * The constructor function creates a new object with the properties x, y,and other properties.
   * @param x - The x coordinate of the tile.
   * @param y - The y coordinate of the tile
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = Math.floor(Math.random() * 10) % 3;
    this.width = 16;
    this.height = 16;
  }

  /**
   * It draws the powerup image to the canvas
   */
  create() {
    context.drawImage(
      Powerups[this.id],
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * SCALE_FACTOR,
      this.height * SCALE_FACTOR
    );
  }

  /**
   * If the player's and powerup collides then the
   * powerup's id is checked and the appropriate action is taken.
   *
   */
  collisionCheck() {
    if (
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.x < this.x + this.width * SCALE_FACTOR &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y &&
      player.y < this.y + this.height * SCALE_FACTOR
    ) {
      switch (this.id) {
        case 0:
          SPEED += 2;
          powerups = undefined;
          break;

        case 1:
          brickArrObj.forEach((brick) => {
            brick.isDestroyed = true;
          });

          enemyObjArr.forEach((enemy) => {
            enemy.isAlive = false;
          });
          powerups = undefined;
          break;

        case 2:
          player.max_bombs_on_field += 1;
          powerups = undefined;
          break;
      }
    }
  }
}
