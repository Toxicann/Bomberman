const canvas = document.getElementById("game__window");
let context = canvas.getContext("2d");

context.webkitImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

let playerMoves = playerMoveDown;
let bomb;

//wall environment matrix creation
let wallArr = [];
var randomDoorCounter = 0;

/**
 * It creates a 2D array of strings, where each string is either "wall", "brick", or "empty".
 *
 * The "wall" strings are the borders of the maze and some inner which are indestructable of maze.
 *
 * The "brick" strings are the randomly generated inner walls which are destructable of maze.
 *
 * The "empty" strings are the spaces in the maze where the player can move.
 *
 * The function also keeps track of the number of "brick" strings in the array.
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
      } else if (Math.random() < 0.3) {
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
  console.log(wallArr);
};

createEnv();

//wall object creation
let strWallArrObj = [];
let brickArrObj = [];
let bombArrObj = [];
let playerCount = 0;
let brickCount = 0;
const doorLocation = getRndInteger(0, randomDoorCounter);

let door;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (wallArr[i][j] === "wall") {
      const wall = new StrongWall(gridCol * j, gridRow * i);
      strWallArrObj.push(wall);
    } else if (wallArr[i][j] === "brick") {
      const brick = new Brick(brickGridCol * j, brickGridRow * i);
      brickArrObj.push(brick);
      brickCount++;
      if (doorLocation == brickCount) {
        door = new Door(brickGridCol * j, brickGridRow * i);
      }
    } else if (wallArr[i][j] === "empty" && playerCount === 0) {
      player = new Player(brickGridCol * j, brickGridRow * i);
      playerCount++;
    }

    // console.log(i, j);
  }
}

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
    console.log("bomb has been planted:");
    console.log(`${player.x}, ${player.y}`);
  } else {
    console.log("max bombs on field reached");
  }
};

/**
 * It draws the player, door, walls, bricks, and bombs.
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
  bombArrObj.forEach((bomb, index) => {
    if (bomb.isPlanted) {
      bomb.create();
      bomb.bombAnimation();
    }
    setTimeout(() => {
      bomb.explosion(index);
    }, 5000);
  });
};

/**
 * It checks for collisions between the player and the walls, bricks, and door.
 */
const collision = () => {
  strWallArrObj.forEach((wall) => {
    wall.checkCollision();
  });
  brickArrObj.forEach((brick) => {
    brick.checkCollision();
  });
  door.checkDoorCollision();
  brickArrObj.forEach((brick, index) => {
    brick.checkDestruction(index);
  });
};

/**
 * "The animate function calls the draw function, and then calls itself again."
 *
 * This is what creates the animation.
 */
const animate = () => {
  draw();
  requestAnimationFrame(animate);
};

animate();
