class Enemy {
  /**
   * This function creates a new enemy object with the given x and y coordinates, and the given id.
   * @param x - x position of the enemy
   * @param y - y position of the enemy
   * @param id - The id of the enemy.
   */
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.isAlive = true;
    this.speed = ESPEED;
    this.Hspeed = 0;
    this.Vspeed = this.speed;
    this.width = 16;
    this.height = 16;
    this.imgSprite = 0;
    this.enemyPos = 0;
    this.enemySprite = 0;
    this.spriteState = 49;
    this.collision = false;
    this.enemyEntity = Math.random();
  }

  /**
   * Draw the image of the ballon at the x and y coordinates of the ballon object,
   *  and scale it to the size of the ballon object.
   */

  create() {
    context.drawImage(
      this.enemyEntity <= 0.25
        ? ballonImgSprite[this.imgSprite]
        : this.enemyEntity > 0.25 && this.enemyEntity <= 0.5
        ? cookieImgSprite[this.imgSprite]
        : this.enemyEntity > 0.5 && this.enemyEntity <= 0.75
        ? barrelImgSprite[this.imgSprite]
        : ghostImgSprite[this.imgSprite],

      this.enemyEntity <= 0.25
        ? ballonSprite[this.enemySprite][this.enemyPos]
        : this.enemyEntity > 0.25 && this.enemyEntity <= 0.5
        ? cookieSprite[this.enemySprite][this.enemyPos]
        : this.enemyEntity > 0.5 && this.enemyEntity <= 0.75
        ? barrelSprite[this.enemySprite][this.enemyPos]
        : ghostSprite[this.enemySprite][this.enemyPos],
      1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * PLAYER_SCALE_FACTOR,
      this.height * PLAYER_SCALE_FACTOR
    );
  }

  /**
   * If the enemy is hit, it will change its sprite to a death sprite
   */
  checkDeath() {
    this.enemySprite = 3;
    setTimeout(() => {
      this.imgSprite = 1;
      this.Hspeed = 0;
      this.Vspeed = 0;
      this.width = 12;
      this.height = 12;
      this.enemySprite = 2;
      if (this.enemyPos >= 2) {
        removeDeadEnemies();
      } else {
        this.enemyPos++;
      }
    }, 3000);
  }

  /**
   * If the enemy is alive, then move the enemy in the direction it's facing.
   */
  update() {
    if (this.isAlive) {
      this.enemyPos == 2 ? (this.enemyPos = 0) : this.enemyPos++;
      this.Hspeed < 0 ? (this.enemySprite = 0) : (this.enemySprite = 1);

      if (this.collision) {
        this.x -= this.Hspeed;
        this.y -= this.Vspeed;
        this.speed = -this.speed;
        let chance = parseInt(Math.random() * 10);
        if (chance % 2 == 0) {
          this.Hspeed = 0;
          this.Vspeed = this.speed;
        } else {
          this.Hspeed = this.speed;
          this.Vspeed = 0;
        }
        this.collision = false;
      } else {
        this.x += this.Hspeed;
        this.y += this.Vspeed;
      }
    } else {
      this.checkDeath();
    }
  }

  /**
   * collision check with player
   */
  checkCollision() {
    if (
      player.x < this.x + this.width * PLAYER_SCALE_FACTOR &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height * PLAYER_SCALE_FACTOR &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      player.isAlive = false;
      player.speed = 0;
    }
  }

  /**
   * collision check with bomb
   */
  checkBombCollision() {
    if (
      bomb.x < this.x + this.width * PLAYER_SCALE_FACTOR &&
      bomb.x + bomb.width * PLAYER_SCALE_FACTOR > this.x &&
      bomb.y < this.y + this.height * PLAYER_SCALE_FACTOR &&
      bomb.y + bomb.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      this.Hspeed = -this.Hspeed;
      this.Vspeed = -this.Vspeed;
    }
  }
}
