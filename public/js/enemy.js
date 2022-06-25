class Enemy {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.isAlive = true;
    this.speed = ESPEED;
    this.Hspeed = 0;
    this.Vspeed = this.speed;
    this.width = 15;
    this.height = 16;
    this.imgSprite = 0;
    this.enemyPos = 0;
    this.enemySprite = 0;
    this.spriteState = 49;
    this.collision = false;
  }

  create() {
    context.drawImage(
      ballonImgSprite[this.imgSprite],
      ballonSprite[this.enemySprite][this.enemyPos],
      1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * PLAYER_SCALE_FACTOR,
      this.height * PLAYER_SCALE_FACTOR
    );
  }

  checkDeath() {
    this.enemySprite = 3;
    setTimeout(() => {
      this.imgSprite = 1;
      this.Hspeed = 0;
      this.Vspeed = 0;
      this.width = 12;
      this.height = 12;
      this.enemySprite = 2;
      this.enemyPos >= 2 ? delete enemyObjArr[this.id] : this.enemyPos++;
    }, 3000);
  }

  update() {
    if (this.isAlive) {
      this.enemyPos == 2 ? (this.enemyPos = 0) : this.enemyPos++;
      // console.log(this.Hspeed, this.Vspeed);
      this.Hspeed < 0 ? (this.enemySprite = 0) : (this.enemySprite = 1);

      if (this.collision) {
        this.x -= this.Hspeed;
        this.y -= this.Vspeed;
        this.speed = -this.speed;
        let chance = parseInt(Math.random() * 10);
        //   console.log(chance);
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

  checkCollision() {
    if (
      player.x < this.x + this.width * PLAYER_SCALE_FACTOR &&
      player.x + player.width * PLAYER_SCALE_FACTOR > this.x &&
      player.y < this.y + this.height * PLAYER_SCALE_FACTOR &&
      player.y + player.height * PLAYER_SCALE_FACTOR > this.y
    ) {
      player.isAlive = false;
      player.speed = 0;
      player.checkDeath();
    }
  }
}
