class Door {
  /**
   * The constructor function is used to create a new object with the properties x, y,
   * @param x - The x coordinate of the door.
   * @param y - The y coordinate of the door.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = DOOR_WIDTH * SCALE_FACTOR;
    this.height = DOOR_HEIGHT * SCALE_FACTOR;
    this.playerDetected = false;
  }

  /**
   * It draws the door image to the canvas.
   */
  create() {
    context.drawImage(doorImg, this.x, this.y, this.width, this.height);
  }

  /**
   * If the player is within the door's x and y coordinates,
   *  then the playerDetected property is set to true.
   */
  checkDoorCollision() {
    if (
      player.x < this.x + this.width &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      this.playerDetected = true;
      if (enemyObjArr.length == 0) {
        levelCompleted = true;
      }
    } else {
      this.playerDetected = false;
    }
  }
}
