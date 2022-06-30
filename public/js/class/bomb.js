class Bomb {
  /**
   * The constructor function for the Bomb class, which takes in the x and y coordinates of the bomb and sets the properties of the bomb.
   * @param x - x-coordinate of the bomb
   * @param y - The y position of the bomb.
   */
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

  /**
   * Draw the bomb image at the x and y coordinates of the bomb object, and scale it to the size of the bomb object.
   */
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

  /**
   * animatest the bomb through bomb sprite
   */
  bombAnimation() {
    if (this.animationInterval >= 15) {
      this.spriteState >= 2 ? (this.spriteState = 0) : this.spriteState++;
      this.animationInterval = 0;
    } else {
      this.animationInterval++;
    }
  }

  /**
   * If the bomb is not exploded, then set the bomb to exploded, create a new explosion object, call the explosionNearby function on the new explosion object.
   * @param index - the index of the bomb in the bombArrObj array
   */
  explosion(index) {
    if (!this.isExploded) {
      this.isExploded = true;
      const explosion = new Explosion(this.x, this.y);
      explosion.explosionNearby();
      explosionObjArr.push(explosion);
      explode.pause();
      explode.currentTime = 0;
      explode.play();
      player.bombs_on_field--;
    }
    removeBombs(bombArrObj, index);
  }
}
