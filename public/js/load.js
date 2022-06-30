/**
 * It fetches the levels from the database, then creates a div for each level, and then creates buttons
 * for each level.
 */
const load = () => {
  fetch(`${url}/load_level`)
    .then((res) => res.json())
    .then((data) => {
      titleScreen.pause();
      titleScreen.currentTime = 0;
      homeScreen.style.display = "none";
      levelLoader.style.display = "flex";

      levelLoader.innerHTML = "";
      data.forEach((level) => {
        const levelItem = document.createElement("div");
        levelItem.classList.add("level__item");
        levelItem.innerHTML = `<h2>${level.level_name}</h2>
        <button class="btn" id="load${level.level_name}">Load</button>
        <button class="btn" id="edit${level.level_name}">Edit</button>
        <button class="btn" id="delete${level.level_name}">Delete</button>`;
        levelLoader.appendChild(levelItem);

        const levelLoadButton = document.getElementById(
          `load${level.level_name}`
        );
        levelLoadButton.addEventListener("click", () => {
          loadLevel(level.level_name);
        });

        const levelEditButton = document.getElementById(
          `edit${level.level_name}`
        );
        levelEditButton.addEventListener("click", () => {
          editLevel(level.level_name);
        });

        const levelDeleteButton = document.getElementById(
          `delete${level.level_name}`
        );
        levelDeleteButton.addEventListener("click", () => {
          deleteLevel(level.level_name);
        });
      });
    });
};

/**
 * It takes a level name as an argument, fetches the level data from the server, and then initializes
 * the game with the fetched data.
 * @param levelName - the name of the level you want to load
 */
const loadLevel = (levelName) => {
  console.log(levelName);
  fetch(`${url}/load_level/${levelName}`)
    .then((res) => res.json())
    .then((data) => {
      initializeGame();
      levelStart.play();

      setTimeout(() => {
        stageTheme.play();
      }, 3000);

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

      const playerData = data.player;
      const enemyObjArrData = data.enemy;
      const strWallArrObjData = data.walls;
      const brickArrObjData = data.bricks;
      const doorData = data.door;

      console.log(player);

      if (playerData != undefined) {
        player = new Player(playerData.x, playerData.y);
        playerCount++;
      } else {
        player = new Player(1 * gridCol, 1 * gridRow);
        playerCount++;
      }

      enemyObjArr = enemyObjArrData.map((enemy) => {
        return new Enemy(enemy.x, enemy.y);
      });

      strWallArrObj = strWallArrObjData.map((wall) => {
        return new StrongWall(wall.x, wall.y);
      });
      brickArrObj = brickArrObjData.map((brick) => {
        return new Brick(brick.x, brick.y);
      });
      if (doorData != undefined) {
        door = new Door(doorData.x, doorData.y);
        doorCount++;
      } else {
        door = new Door(30 * gridCol, 10 * gridRow);
        doorCount++;
      }

      levelLoader.style.display = "none";
      canvas.style.display = "block";
      gameInfo.style.display = "flex";

      startFlag = true;
      playerDeathInterval();
      animate();
    });
};

//delete the level and load the level loader again after the query is complete
const deleteLevel = (levelName) => {
  fetch(`${url}/delete_level/${levelName}`, options({}, "DELETE")).then(
    (res) => {
      goHome();
      return res.json();
    }
  );
};

/**
 * It fetches the level data from the database, deletes the level from the database, and then creates
 * the level again.
 * @param levelName - the name of the level you want to edit
 */
const editLevel = (levelName) => {
  fetch(`${url}/load_level/${levelName}`)
    .then((res) => res.json())
    .then((data) => {
      const playerData = data.player;
      const enemyObjArrData = data.enemy;
      const strWallArrObjData = data.walls;
      const brickArrObjData = data.bricks;
      const doorData = data.door;

      fetch(`${url}/delete_level/${levelName}`, options({}, "DELETE"));

      create();
      levelLoader.style.display = "none";
      if (playerData != undefined) {
        player = new Player(playerData.x, playerData.y);
        playerCount++;
      }

      enemyObjArr = enemyObjArrData.map((enemy) => {
        return new Enemy(enemy.x, enemy.y);
      });

      strWallArrObj = strWallArrObjData.map((wall) => {
        return new StrongWall(wall.x, wall.y);
      });
      brickArrObj = brickArrObjData.map((brick) => {
        return new Brick(brick.x, brick.y);
      });

      if (doorData != undefined) {
        door = new Door(doorData.x, doorData.y);
        doorCount++;
      }
    });
};
