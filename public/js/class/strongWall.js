class StrongWall {
  /**
   * The constructor function creates a new object with the properties x, y,and other properties.
   * @param x - the x coordinate of the top left corner of the rectangle
   * @param y - The y coordinate of the top left corner of the rectangle.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = gridCol;
    this.height = gridRow;
  }

  /**
   * It draws an image to the canvas
   */
  create() {
    context.drawImage(strongWallImg, this.x, this.y, this.width, this.height);
  }

  /**
   * checks player collision with the strong aka indestructible wall
   */
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

  /**
   * checks enemy collision with strong wall
   */
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

  /**
   * checks bomb collision and clear's the surrounding tiles
   */
  checkBombCollision() {
    bombArrObj.forEach((bomb) => {
      if (
        bomb.x < this.x + gridCol + this.width &&
        bomb.x + bomb.width > this.x + gridCol &&
        bomb.y < this.y + this.height &&
        bomb.y + bomb.height > this.y
      ) {
        isLeftClear = false;
      }

      if (
        bomb.x < this.x - gridCol + this.width &&
        bomb.x + bomb.width > this.x - gridCol &&
        bomb.y < this.y + this.height &&
        bomb.y + bomb.height > this.y
      ) {
        isRightClear = false;
      }

      if (
        bomb.x < this.x + this.width &&
        bomb.x + bomb.width > this.x &&
        bomb.y < this.y + gridRow + this.height &&
        bomb.y + bomb.height > this.y + gridRow
      ) {
        isBottomClear = false;
      }

      if (
        bomb.x < this.x + this.width &&
        bomb.x + bomb.width > this.x &&
        bomb.y < this.y - gridRow + this.height &&
        bomb.y + bomb.height > this.y - gridRow
      ) {
        isTopClear = false;
      }
    });
  }
}
