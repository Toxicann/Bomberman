class Door {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = DOOR_WIDTH * SCALE_FACTOR;
    this.height = DOOR_HEIGHT * SCALE_FACTOR;
    this.playerDetected = false;
  }

  create() {
    context.drawImage(doorImg, this.x, this.y, this.width, this.height);
  }

  checkDoorCollision() {
    if (
      player.x < this.x + this.width &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      this.playerDetected = true;
    } else {
      this.playerDetected = false;
    }
  }
}
