/**
 * plays game sound, creates &  runs the game level
 */
const run = () => {
  levelStart.play();
  setTimeout(() => {
    stageTheme.play();
  }, 3000);

  initializeGame();
  createEnv();
  doorLocation = getRndInteger(0, randomDoorCounter);
  powerUpLocation = getRndInteger(0, randomDoorCounter);
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
 * plants bomb if the bomb can be planted by player determined by max bombs on field
 */
const plantBomb = () => {
  if (player.bombs_on_field < player.max_bombs_on_field) {
    bomb = new Bomb(
      Math.floor(player.x / gridCol) * gridCol,
      Math.floor(player.y / gridRow) * gridRow
    );

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

  if (doorCount > 0) door.create();

  if (powerups != undefined) powerups.create();

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

  if (playerCount > 0) player.create();

  explosionObjArr.forEach((explosion, index) => {
    explosion.create();
    explosion.explosionAnimation(index);
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
 * If the player is dead, check if they're dead, clear the interval,
 *  and after 3 seconds, display the home screen.
 */
const playerDeathInterval = () => {
  const playerUpdates = setInterval(() => {
    if (!player.isAlive) {
      if (highScore < gameScore) {
        highScore = gameScore;
        setHighScore(highScore);
      }
      stageTheme.pause();
      findDoor.pause();
      stageTheme.currentTime = 0;
      findDoor.currentTime = 0;
      player.checkDeath();
      gameOver.play();
      clearInterval(playerUpdates);
      setTimeout(() => {
        stageTheme.pause();
        findDoor.pause();
        stageTheme.currentTime = 0;
        findDoor.currentTime = 0;
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
 * runs the loop when start flag is true, animates the game, and checks for collisions
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
