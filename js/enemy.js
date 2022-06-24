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
    this.enemyPos = 0;
    this.enemySprite = 0;
    this.spriteState = 49;
    this.collision = false;
  }

  create() {
    context.drawImage(
      ballonImg,
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

  update() {
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
  }
}
