class Explosion {
  /**
   * The constructor function creates a new explosion object with the given x and y coordinates, and sets
   * the width, height, spriteState, and animationInterval properties.
   * @param x - The x coordinate of the explosion.
   * @param y - The y coordinate of the explosion
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = EXPLOSION_WIDTH;
    this.height = EXPLOSION_HEIGHT;
    this.spriteState = 0;
    this.animationInterval = 0;
  }

  /**
   * Draw the image of the explosion at the x and y coordinates of the explosion, and scale it by the
   * scale factor.
   */
  create() {
    context.drawImage(
      centerExplosionImg,
      centerExplosion[this.spriteState],
      1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * SCALE_FACTOR,
      this.height * SCALE_FACTOR
    );
  }

  /**
   * If the animation interval is greater than or equal to 15, then if the sprite state is greater than
   * or equal to 3, delete the explosion object from the array, otherwise increment the sprite state. If
   * the animation interval is not greater than or equal to 15, increment the animation interval.
   * @param index - the index of the explosion object in the explosionObjArr array
   */
  explosionAnimation(index) {
    if (this.animationInterval >= 15) {
      this.spriteState >= 3
        ? removeObjects(explosionObjArr, index)
        : this.spriteState++;
      this.animationInterval = 0;
    } else {
      this.animationInterval++;
    }
  }

  /**
   * If the left, right, top, or bottom of the bomb is clear, then create an explosion object at that
   * location
   */
  explosionNearby() {
    if (isLeftClear) {
      const explosion = new Explosion(this.x - gridCol, this.y);
      explosionObjArr.push(explosion);
    }
    if (isRightClear) {
      const explosion = new Explosion(this.x + gridCol, this.y);
      explosionObjArr.push(explosion);
    }
    if (isTopClear) {
      const explosion = new Explosion(this.x, this.y + gridRow);
      explosionObjArr.push(explosion);
    }
    if (isBottomClear) {
      const explosion = new Explosion(this.x, this.y - gridRow);
      explosionObjArr.push(explosion);
    }
  }

  /**
   * Check Collision with player
   */
  checkCollision() {
    if (
      player.x < this.x + this.width * SCALE_FACTOR &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height * SCALE_FACTOR &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      player.isAlive = false;
    }
  }

  /**
   * If the player's x and y coordinates are within the enemy's x and y coordinates, then the enemy is
   * dead
   */
  checkEnemyCollision() {
    enemyObjArr.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width * PLAYER_SCALE_FACTOR &&
        enemy.x + enemy.width * PLAYER_SCALE_FACTOR > this.x &&
        enemy.y < this.y + this.height * PLAYER_SCALE_FACTOR &&
        enemy.y + enemy.height * PLAYER_SCALE_FACTOR > this.y
      ) {
        enemy.isAlive = false;
      }
    });
  }
}
