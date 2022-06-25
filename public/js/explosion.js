class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = EXPLOSION_WIDTH;
    this.height = EXPLOSION_HEIGHT;
    this.spriteState = 0;
    this.animationInterval = 0;
  }

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

  explosionAnimation(index) {
    if (this.animationInterval >= 15) {
      this.spriteState >= 3
        ? delete explosionObjArr[index]
        : this.spriteState++;
      this.animationInterval = 0;
    } else {
      this.animationInterval++;
    }
  }

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
