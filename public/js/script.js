const canvas = document.getElementById("game__window");
let context = canvas.getContext("2d");

const gameInfo = document.getElementById("game__info");

gameInfo.style.width = toPx(WINDOW_WIDTH - 4);
gameInfo.style.height = toPx(60);

const timer = document.createElement("h2");
timer.innerHTML = "Time: ";
gameInfo.appendChild(timer);

const score = document.createElement("h2");
score.innerHTML = "Score: 0";
gameInfo.appendChild(score);

const life = document.createElement("h2");
life.innerHTML = "Lives: 0";
gameInfo.appendChild(life);

context.webkitImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

/**
 * The run function initializes the game, creates the environment, generates a random door location,
 * and generates the terrain.
 */
const run = () => {
  initializeGame();
  createEnv();
  doorLocation = getRndInteger(0, randomDoorCounter);
  generateTerrain();
};

/**
 * If the startFlag is true, run the run() function.
 */
const checkFlag = () => {
  if (startFlag) {
    run();
  }
};

/**
 * If the player has less than the max number of bombs on the field, create a new bomb object at the
 * player's current position, add it to the bomb array, and increment the player's bomb count.
 */
const plantBomb = () => {
  console.log(player.bombs_on_field, player.max_bombs_on_field);
  if (player.bombs_on_field < player.max_bombs_on_field) {
    bomb = new Bomb(player.x, player.y);
    bomb.isPlanted = true;
    player.bombs_on_field++;
    bombArrObj.push(bomb);
  }
};

/**
 * It draws the player, door, walls, bricks, enemies, bombs, and explosions.
 */
const draw = () => {
  context.save();
  context.clearRect(0, 0, canvas.width, canvas.height);

  player.create();

  door.create();

  strWallArrObj.forEach((wall) => {
    wall.create();
  });

  brickArrObj.forEach((brick) => {
    brick.create();
  });

  enemyObjArr.forEach((enemy) => {
    enemy.create();
  });

  bombArrObj.forEach((bomb, index) => {
    if (bomb.isPlanted) {
      bomb.create();
      bomb.bombAnimation();
    }
    setTimeout(() => {
      bomb.explosion(index);
    }, 5000);
  });

  explosionObjArr.forEach((explosion, index) => {
    explosion.create();
    explosion.explosionAnimation(index);
  });
};

/**
 * Check for collisions between the player and the walls, bricks, door, and enemies.
 */
const collision = () => {
  strWallArrObj.forEach((wall, index) => {
    wall.checkCollision();
    wall.checkEnemyCollision();
    wall.checkBombCollision(index);
  });

  brickArrObj.forEach((brick, index) => {
    brick.checkCollision();
    brick.checkEnemyCollision();
    brick.checkDestruction(index);
    brick.checkBombCollision(index);
    brick.checkExplosionCollision(index);
  });

  door.checkDoorCollision();

  enemyObjArr.forEach((enemy, index) => {
    enemy.checkCollision(index);
    if (bombArrObj.length > 0) {
      enemy.checkBombCollision(index);
    }
  });

  explosionObjArr.forEach((explosion) => {
    explosion.checkCollision();
    explosion.checkEnemyCollision();
  });
};

/* Updating the timer, score, and gameTimer every second. */
const updateParameters = setInterval(() => {
  if (start) {
    if (gameTimer >= 0) {
      timer.innerHTML = `Time: ${gameTimer}`;
      score.innerHTML = `Score: ${gameScore}`;
      gameTimer--;
    } else {
      player.isAlive = false;
    }
  }
}, 1000);

/**
 * If the startFlag is true, then if the animationInterval is greater than or equal to 20, then call
 * the collision function, then for each enemy in the enemyObjArr, call the update function, then set
 * the animationInterval to 0, otherwise increment the animationInterval, then call the draw function,
 * then call the animate function.
 */
const animate = () => {
  if (startFlag) {
    if (animationInterval >= 20) {
      collision();

      enemyObjArr.forEach((enemy) => {
        enemy.update();
      });

      animationInterval = 0;
    } else {
      animationInterval++;
    }
    draw();
  }
  requestAnimationFrame(animate);
};

animate();
