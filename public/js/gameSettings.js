let playerMoves = playerMoveDown;

let randomDoorCounter;
let enemyCount;
let playerCount;
let brickCount;
let animationInterval;
let gameTimer;
let gameScore;

let bomb;
let door;
let playeri;
let playerj;
let doorLocation;

let isLeftClear;
let isRightClear;
let isTopClear;
let isBottomClear;

let explosionObjArr;
let wallArr;
let strWallArrObj;
let brickArrObj;
let bombArrObj;
let enemyObjArr;

/**
 * InitializeGame() is a function that resets all the variables to their original values.
 */
const initializeGame = () => {
  randomDoorCounter = 0;
  enemyCount = 0;
  playerCount = 0;
  brickCount = 0;
  animationInterval = 0;
  gameTimer = 200;
  gameScore = 0;

  isLeftClear = true;
  isRightClear = true;
  isTopClear = true;
  isBottomClear = true;

  explosionObjArr = [];
  wallArr = [];
  strWallArrObj = [];
  brickArrObj = [];
  bombArrObj = [];
  enemyObjArr = [];
};

/**
 * It creates a 2D array of strings, where each string represents a type of cell
 */
const createEnv = () => {
  console.log("aii");
  for (let i = 0; i < numRows; i++) {
    let wallArrRow = [];
    for (let j = 0; j < numCols; j++) {
      // for border strong walls
      if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1) {
        wallArrRow.push("wall");
      }

      //for inner strong walls
      else if (
        i !== 1 &&
        j !== 1 &&
        i !== numRows - 2 &&
        j !== numCols - 2 &&
        i % 2 == 0 &&
        j % 2 == 0
      ) {
        wallArrRow.push("wall");
      }

      //for player
      else if (playerCount === 0) {
        wallArrRow.push("player");
        playeri = i;
        playerj = j;
        playerCount++;
      }

      //for bricks
      else if (Math.random() < 0.3 && (i > playeri + 2 || j > playerj + 3)) {
        wallArrRow.push("brick");
        randomDoorCounter++;
      }

      //for empty spaces
      else {
        wallArrRow.push("empty");
      }
    }
    wallArr.push(wallArrRow);
  }
};

/**
 * It generates the terrain for the game.
 */
const generateTerrain = () => {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      //generate walls
      if (wallArr[i][j] === "wall") {
        const wall = new StrongWall(gridCol * j, gridRow * i);
        strWallArrObj.push(wall);
      }

      //generate bricks
      else if (wallArr[i][j] === "brick") {
        const brick = new Brick(brickGridCol * j, brickGridRow * i);
        brickArrObj.push(brick);
        brickCount++;

        //generate door on brick
        if (doorLocation == brickCount) {
          door = new Door(brickGridCol * j, brickGridRow * i);
        }
      }

      //generate player
      else if (wallArr[i][j] === "player") {
        player = new Player(brickGridCol * j, brickGridRow * i);
      }

      //generate Enemies
      else if (wallArr[i][j] === "empty" && enemyCount < maxEnemyCount) {
        if (Math.random() <= 0.04) {
          enemy = new Enemy(brickGridCol * j, brickGridRow * i, enemyCount);
          enemyCount++;
          enemyObjArr.push(enemy);
        }
      }
    }
  }
};
