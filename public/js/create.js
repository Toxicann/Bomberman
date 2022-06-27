let isLevelEditor = false;
let isDelete = false;

let strWall;
let brick;
let enemy;

let isWallSelected;
let isBrickSelected;
let isDoorSelected;
let isPlayerSelected;
let isEnemySelected;

const create = () => {
  homeScreen.style.display = "none";
  canvas.style.display = "flex";
  levelEditor.style.display = "flex";
  isLevelEditor = true;
  initializeGame();
  animate();
};

const selectWall = () => {
  isWallSelected = true;
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = false;
};

const selectBrick = () => {
  isWallSelected = false;
  isBrickSelected = true;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = false;
};

const selectDoor = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = true;
  isPlayerSelected = false;
  isEnemySelected = false;
};

const selectPlayer = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = true;
  isEnemySelected = false;
};

const selectEnemy = () => {
  isWallSelected = false;
  isBrickSelected = false;
  isDoorSelected = false;
  isPlayerSelected = false;
  isEnemySelected = true;
};

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

const createTiles = (event) => {
  if (isLevelEditor) {
    let arr = getCoordinates(event);
    let contains = containsObject(arr);
    if (!contains && !isDelete) {
      placeTile(arr);
    }
  }
};

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

const deleteTile = (event) => {
  isDelete = !isDelete;
};

const saveMapEntities = () => {
  // console.log("fired");
  let wallArrAsString = JSON.stringify(strWallArrObj);
  let brickArrAsString = JSON.stringify(brickArrObj);
  let enemyArrAsString = JSON.stringify(enemyObjArr);
  let playerAsString = JSON.stringify(player);
  let doorAsString = JSON.stringify(door);

  // console.log(JSON.parse(wallArrAsString));

  savedMapFile = {
    level_name: levelInput.value,
    walls: wallArrAsString,
    bricks: brickArrAsString,
    enemy: enemyArrAsString,
    player: playerAsString,
    door: doorAsString,
  };

  console.log(savedMapFile);
};
