let context = canvas.getContext("2d");

gameInfo.style.width = toPx(WINDOW_WIDTH - 4);
gameInfo.style.height = toPx(60);

levelEditor.style.width = toPx(WINDOW_WIDTH - 4);
levelEditor.style.height = toPx(60);

levelLoader.style.width = toPx(WINDOW_WIDTH);
levelLoader.style.height = toPx(WINDOW_HEIGHT);

timer.innerHTML = "Time: ";
gameInfo.appendChild(timer);

score.innerHTML = "Score: 0";
gameInfo.appendChild(score);

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
  levelStart.play();
  setTimeout(() => {
    stageTheme.play();
  }, 3000);
  initializeGame();
  createEnv();
  doorLocation = getRndInteger(0, randomDoorCounter);
  generateTerrain();

  const findDoorSound = setInterval(() => {
    if (enemyObjArr.length == 0) {
      stageTheme.pause();
      stageTheme.currentTime = 0;
      findDoor.play();
      clearInterval(findDoorSound);
    }
  }, 1000);

  const lastEnemySound = setInterval(() => {
    if (enemyObjArr.length == 1) {
      lastEnemy.play();
      clearInterval(lastEnemySound);
    }
  });
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
    putBomb.play();
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

  if (playerCount > 0) player.create();

  if (doorCount > 0) door.create();

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
    if (player != undefined) {
      wall.checkCollision();
    }
    wall.checkEnemyCollision();
    wall.checkBombCollision(index);
  });

  brickArrObj.forEach((brick, index) => {
    if (player != undefined) {
      brick.checkCollision();
    }
    brick.checkEnemyCollision();
    brick.checkDestruction(index);
    brick.checkBombCollision(index);
    brick.checkExplosionCollision(index);
  });

  if (door != undefined) {
    door.checkDoorCollision();
  }

  enemyObjArr.forEach((enemy, index) => {
    if (player != undefined) {
      enemy.checkCollision(index);
    }

    if (bombArrObj.length > 0) {
      enemy.checkBombCollision(index);
    }
  });

  explosionObjArr.forEach((explosion) => {
    if (player != undefined) {
      explosion.checkCollision();
    }

    explosion.checkEnemyCollision();
  });
};

/* Updating the timer, score, and gameTimer every second. */

const updateParameters = setInterval(() => {
  if (startFlag) {
    if (gameTimer >= 0 && player.isAlive) {
      timer.innerHTML = `Time: ${gameTimer}`;
      score.innerHTML = `Score: ${gameScore}`;
      gameTimer--;
    } else {
      player.isAlive = false;
    }
  }
}, 1000);

/**
 * If the player is dead, check if they're dead, clear the interval, and after 3 seconds, display the
 * home screen.
 */
const playerDeathInterval = () => {
  const playerUpdates = setInterval(() => {
    if (!player.isAlive) {
      stageTheme.pause();
      findDoor.pause();
      stageTheme.currentTime = 0;
      findDoor.currentTime = 0;
      player.checkDeath();
      gameOver.play();
      clearInterval(playerUpdates);
      setTimeout(() => {
        if (highScore < gameScore) {
          highScore = gameScore;
          setHighScore(highScore);
        }
        titleScreen.play();
        homeScreen.style.display = "flex";
        canvas.style.display = "none";
        gameInfo.style.display = "none";
        startFlag = false;
      }, 6500);
    }
  }, 1000);
};

/**
 * If the startFlag is true, then if the animationInterval is greater than or equal to 20, then call
 * the collision function, then for each enemy in the enemyObjArr, call the update function, then set
 * the animationInterval to 0, otherwise increment the animationInterval, then call the draw function,
 * then call the animate function.
 */
const animate = () => {
  if (startFlag) {
    if (animationInterval >= 20) {
      if (!isLevelEditor) {
        collision();
        enemyObjArr.forEach((enemy) => {
          enemy.update();
        });
      }

      animationInterval = 0;
    } else {
      animationInterval++;
    }
  }
  draw();
  nextLevel();
  requestAnimationFrame(animate);
};

/**
 * regenerate the randomized environment for next level keeping current score intact
 */
const nextLevel = () => {
  if (levelCompleted) {
    levelCompleted = false;
    stageTheme.pause();
    stageTheme.currentTime = 0;
    findDoor.pause();
    findDoor.currentTime = 0;
    maxEnemyCount++;
    gameScore += 1000;
    startFlag = true;
    checkFlag();
    playerDeathInterval();
    animate();
    run();
  }
};

// animate();
