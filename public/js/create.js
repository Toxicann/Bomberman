/**
 * starts level creator
 */
const create = () => {
  titleScreen.pause();
  titleScreen.currentTime = 0;
  homeScreen.style.display = "none";
  canvas.style.display = "flex";
  levelEditor.style.display = "flex";
  isLevelEditor = true;
  initializeGame();
  animate();
};

/**
 * When the Wall is selected, the other objects are not selected..
 */
const selectWall = () => {
  isWallSelected = true;
  isDoorSelected = false;
  isBrickSelected = false;
  isEnemySelected = false;
  isPlayerSelected = false;
};

/**
 * When the Brick is selected, the other objects are not selected.
 */
const selectBrick = () => {
  isWallSelected = false;
  isDoorSelected = false;
  isBrickSelected = true;
  isEnemySelected = false;
  isPlayerSelected = false;
};

/**
 * When the Door is selected, the other objects are not selected.
 */
const selectDoor = () => {
  isDoorSelected = true;
  isWallSelected = false;
  isBrickSelected = false;
  isEnemySelected = false;
  isPlayerSelected = false;
};

/**
 * When the player is selected, the other objects are not selected.
 */
const selectPlayer = () => {
  isWallSelected = false;
  isDoorSelected = false;
  isBrickSelected = false;
  isEnemySelected = false;
  isPlayerSelected = true;
};

/**
 *  When the enemy is selected, the other objects are not selected.
 */
const selectEnemy = () => {
  isWallSelected = false;
  isDoorSelected = false;
  isEnemySelected = true;
  isBrickSelected = false;
  isPlayerSelected = false;
};

/**
 * It checks if the given array contains an object in the given array.
 * @param arr - an array of two numbers, the first being the column and the second being the row.
 * @returns A boolean value.
 */
const containsObject = (arr) => {
  for (let i = 0; i < strWallArrObj.length; i++) {
    if (
      strWallArrObj[i].x == gridCol * arr[0] &&
      strWallArrObj[i].y == gridRow * arr[1]
    ) {
      if (isDelete) {
        delete strWallArrObj[i];
        strWallArrObj = cleanArr(strWallArrObj);
      }
      return true;
    }
  }

  for (let i = 0; i < brickArrObj.length; i++) {
    if (
      brickArrObj[i].x == gridCol * arr[0] &&
      brickArrObj[i].y == gridRow * arr[1]
    ) {
      if (isDelete) {
        delete brickArrObj[i];
        brickArrObj = cleanArr(brickArrObj);
      }
      return true;
    }
  }

  for (let i = 0; i < enemyObjArr.length; i++) {
    if (
      enemyObjArr[i].x == gridCol * arr[0] &&
      enemyObjArr[i].y == gridRow * arr[1]
    ) {
      if (isDelete) {
        delete enemyObjArr[i];
        enemyObjArr = cleanArr(enemyObjArr);
      }
      return true;
    }
  }

  if (door != undefined) {
    if (door.x == gridCol * arr[0] && door.y == gridRow * arr[1]) {
      if (isDelete) {
        door = undefined;
        doorCount--;
      }
      return true;
    }
  }

  if (player != undefined) {
    if (player.x == gridCol * arr[0] && player.y == gridRow * arr[1]) {
      if (isDelete) {
        player = undefined;
        playerCount--;
      }
      return true;
    }
  }

  return false;
};

/**
 * If the level editor is active, get the coordinates of the mouse click, check if the coordinates are
 * already in the array, and if they aren't, place a tile at the coordinates.
 * @param event - The event that is passed to the function.
 */
const createTiles = (event) => {
  if (isLevelEditor) {
    let arr = getCoordinates(event);
    let contains = containsObject(arr);
    if (!contains && !isDelete) {
      placeTile(arr);
    }
  }
};

/**
 * It places a tile on the canvas based on the mouse click position and the tile selected.
 * @param arr - [x, y]
 */
const placeTile = (arr) => {
  if (isWallSelected) {
    strWall = new StrongWall(gridCol * arr[0], gridRow * arr[1]);
    strWallArrObj.push(strWall);
  } else if (isBrickSelected) {
    brick = new Brick(gridCol * arr[0], gridRow * arr[1]);
    brickArrObj.push(brick);
  } else if (isPlayerSelected && playerCount == 0) {
    player = new Player(gridCol * arr[0], gridRow * arr[1]);
    playerCount++;
  } else if (isEnemySelected) {
    enemy = new Enemy(gridCol * arr[0], gridRow * arr[1]);
    enemyObjArr.push(enemy);
  } else if (isDoorSelected && doorCount == 0) {
    door = new Door(gridCol * arr[0], gridRow * arr[1]);
    doorCount++;
  }
};

/**
 * If the delete button is clicked, the isDelete variable is set to true.
 * @param event - The event object
 */
const deleteTile = (event) => {
  isDelete = !isDelete;
};

/**
 * It takes the values of the levelInput, strWallArrObj, brickArrObj, enemyObjArr, player, and door
 * variables and sends them to the server.
 */
const saveMapEntities = () => {
  const savedMapObj = {
    level_name: levelInput.value || `level${Math.random().toFixed(2) * 1000}`,
    walls: strWallArrObj,
    bricks: brickArrObj,
    enemy: enemyObjArr,
    player: player,
    door: door,
  };
  saveMap.innerText = "Saving";
  fetch(`${url}/create_level`, options(savedMapObj, "POST")).then(goHome);
};

/**
 * go to home screen
 */
const goHome = () => {
  saveMap.innerText = "save";
  levelInput.value = "";

  homeScreen.style.display = "flex";
  canvas.style.display = "none";
  levelEditor.style.display = "none";

  isLevelEditor = false;
  isDelete = false;
  initializeGame();
};
