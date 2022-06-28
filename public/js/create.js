let isLevelEditor = false;
let isDelete = false;

let strWall;
let brick;
let enemy;

let isWallSelected = true;
let isBrickSelected;
let isDoorSelected;
let isPlayerSelected;
let isEnemySelected;

/**
 * It hides the home screen, shows the canvas and level editor, sets the isLevelEditor variable to
 * true, initializes the game, and starts the animation
 */
const create = () => {
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
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = false;
};

/**
 * When the Brick is selected, the other objects are not selected.
 */
const selectBrick = () => {
  isWallSelected = false;
  isBrickSelected = true;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = false;
};

/**
 * When the Door is selected, the other objects are not selected.
 */
const selectDoor = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = true;
  isPlayerSelected = false;
  isEnemySelected = false;
};

/**
 * When the player is selected, the other objects are not selected.
 */
const selectPlayer = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = true;
  isEnemySelected = false;
};

/**
 *  When the enemy is selected, the other objects are not selected.
 */
const selectEnemy = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = true;
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
  } else if (isDoorSelected && doorCount == 0) {
    door = new Door(gridCol * arr[0], gridRow * arr[1]);
    doorCount++;
  } else if (isPlayerSelected && playerCount == 0) {
    player = new Player(gridCol * arr[0], gridRow * arr[1]);
    playerCount++;
  } else if (isEnemySelected) {
    enemy = new Enemy(gridCol * arr[0], gridRow * arr[1]);
    enemyObjArr.push(enemy);
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
    level_name: levelInput.value || "Level",
    walls: strWallArrObj,
    bricks: brickArrObj,
    enemy: enemyObjArr,
    player: player,
    door: door,
  };

  fetch(`${url}/create_level`, options(savedMapObj, "POST"))
    .then((res) => res.json())
    .then((data) => {
      console.log(data.body);
    });

  goHome();
};

/**
 * When the home button is clicked, the home screen is displayed, the canvas is hidden, the level
 * editor is hidden, the level editor is not active, and the delete button is not active.
 */
const goHome = () => {
  homeScreen.style.display = "flex";
  canvas.style.display = "none";
  levelEditor.style.display = "none";
  isLevelEditor = false;
  isDelete = false;
  initializeGame();
};
