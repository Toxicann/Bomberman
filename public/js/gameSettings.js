let gameTimer;
let gameScore = 0;
let maxEnemyCount = 5;
let animationInterval;
let collisionRadius = 150;

let highScore;
let doorCount;
let brickCount;
let enemyCount;
let powerCount;
let playerCount;
let powerUpCount;
let levelCompleted;
let randomDoorCounter;
let randomPowerUpCounter;

let bomb;
let door;
let SPEED;
let brick;
let enemy;
let player;
let strWall;
let playeri;
let playerj;
let powerups;
let doorLocation;
let powerUpLocation;

let isTopClear;
let isLeftClear;
let isRightClear;
let isBottomClear;

let wallArr;
let levelArr;
let bombArrObj;
let brickArrObj;
let enemyObjArr;
let strWallArrObj;
let explosionObjArr;

let isDoorSelected;
let isBrickSelected;
let isEnemySelected;
let isPlayerSelected;
let isWallSelected = true;

let isDelete = false;
let startFlag = false;
let isLevelEditor = false;

let playerMoves = playerMoveDown;

/**
 * InitializeGame() is a function that resets all the variables to their original values.
 */
const initializeGame = () => {
  getHighScore();

  startFlag = true;
  levelCompleted = false;

  doorCount = 0;
  enemyCount = 0;
  powerCount = 0;
  brickCount = 0;
  playerCount = 0;
  powerUpCount = 1;
  randomDoorCounter = 0;
  animationInterval = 0;
  randomPowerUpCounter = 0;

  SPEED = 4;
  gameTimer = 200;

  isTopClear = true;
  isLeftClear = true;
  isRightClear = true;
  isBottomClear = true;

  wallArr = [];
  bombArrObj = [];
  enemyObjArr = [];
  brickArrObj = [];
  strWallArrObj = [];
  explosionObjArr = [];

  door = undefined;
  player = undefined;
  powerups = undefined;
};

/**
 * It creates a 2D array of strings, where each string represents a type of cell
 */
const createEnv = () => {
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
        randomPowerUpCounter++;
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
        const brick = new Brick(gridCol * j, gridRow * i);
        brickArrObj.push(brick);
        brickCount++;

        //generate door on brick
        if (doorLocation == brickCount) {
          door = new Door(gridCol * j, gridRow * i);
          doorCount++;
        }

        if (powerUpLocation == brickCount) {
          powerups = new Powerup(gridCol * j, gridRow * i);
          powerCount++;
        }
      }

      //generate player
      else if (wallArr[i][j] === "player") {
        player = new Player(gridCol * j, gridRow * i);
      }

      //generate Enemies
      else if (wallArr[i][j] === "empty" && enemyCount < maxEnemyCount) {
        if (Math.random() <= 0.04) {
          enemy = new Enemy(gridCol * j, gridRow * i, enemyCount);
          enemyCount++;
          enemyObjArr.push(enemy);
        }
      }
    }
  }
};
