const canvas = document.getElementById("game__window");
let context = canvas.getContext("2d");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

//create player
const player = new Player();

let playerMoves = playerMoveDown;

//wall environment matrix creation
let wallArr = [];
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
      //for empty spaces
      else {
        wallArrRow.push("empty");
      }
      // wallArrRow.push((i, j));
    }
    wallArr.push(wallArrRow);
  }
  console.log(wallArr);
};

createEnv();

//wall object creation
let wallArrObj = [];

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (wallArr[i][j] === "wall") {
      const wall = new StrongWall(gridCol * j, gridRow * i);
      wallArrObj.push(wall);
    }
    // console.log(i, j);
  }
}

//draw function
const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.create();
  wallArrObj.forEach((wall) => {
    wall.create();
  });
};

//collision
collision = () => {
  wallArrObj.forEach((wall) => {
    // console.log(wall);
    // console.log(player.y, wall.y + wall.height * SCALE_FACTOR);
    wall.checkCollision();
  });
};

function animate() {
  // collision();
  draw();

  requestAnimationFrame(animate);
}

animate();

//key event listener;
addEventListener("keydown", ({ code }) => {
  // console.log(code);
  switch (code) {
    case "KeyD":
      // console.log(player.speed);
      player.x += player.speed;
      playerMoves = playerMoveRight;
      collision();
      if (player.playerCollision) {
        player.x -= SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;
    case "KeyA":
      player.x -= player.speed;
      playerMoves = playerMoveLeft;
      collision();
      if (player.playerCollision) {
        player.x += SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;
    case "KeyW":
      player.y -= player.speed;
      playerMoves = playerMoveUp;
      collision();
      if (player.playerCollision) {
        player.y += SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;
    case "KeyS":
      player.y += player.speed;
      playerMoves = playerMoveDown;
      collision();
      if (player.playerCollision) {
        player.y -= SPEED;
        player.playerCollision = false;
      }
      player.update();
      break;
  }
});
