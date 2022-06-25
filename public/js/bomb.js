class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = BOMB_WIDTH;
    this.height = BOMB_HEIGHT;
    this.isPlanted = false;
    this.isExploded = false;
    this.spritePos = 0;
    this.spriteState = 0;
    this.animationInterval = 0;
  }

  create() {
    context.drawImage(
      bombImg,
      bombSprite[this.spriteState],
      1,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * PLAYER_SCALE_FACTOR,
      this.height * PLAYER_SCALE_FACTOR
    );
  }

  bombAnimation() {
    if (this.animationInterval >= 15) {
      this.spriteState >= 2 ? (this.spriteState = 0) : this.spriteState++;
      this.animationInterval = 0;
    } else {
      this.animationInterval++;
    }
  }

  explosion(index) {
    if (!this.isExploded) {
      console.log("Exploooooooooooooooooooooooosion!");
      this.isExploded = true;
      const explosion = new Explosion(this.x, this.y);
      explosion.explosionNearby();
      explosionObjArr.push(explosion);
      delete bombArrObj[index];
      player.bombs_on_field--;
    }
  }
}
