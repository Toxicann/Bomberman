const wallTile = document.getElementById("wallTile");
const doorTile = document.getElementById("doorTile");
const brickTile = document.getElementById("brickTile");
const enemyEnitity = document.getElementById("enemyEntity");
const playerEntity = document.getElementById("playerEntity");

const btnGroup = document.getElementById("btn--grp");
const saveSettings = document.getElementById("save--settings");

const exit = document.getElementById("exit");
const saveMap = document.getElementById("save");
const clearMap = document.getElementById("clear");
const remove = document.getElementById("deleteTile");

const levelInput = document.getElementById("level--input");

const life = document.createElement("h2");
const score = document.createElement("h2");
const timer = document.createElement("h2");

const levelLoader = document.getElementById("load--levels");
const levelEditor = document.getElementById("level__editor");

const gameInfo = document.getElementById("game__info");
const canvas = document.getElementById("game__window");

const HIGHSCORE = document.getElementById("highscore");

const homeScreen = document.getElementById("home");

const newGame = document.getElementById("start");
const loadGame = document.getElementById("load");
const createGame = document.getElementById("create");

const context = canvas.getContext("2d");

const WINDOW_WIDTH = 1485;
const WINDOW_HEIGHT = 765;

const STRWALL_WIDTH = 15;
const STRWALL_HEIGHT = 17;

const BRICK_WIDTH = 15;
const BRICK_HEIGHT = 17;

const SCALE_FACTOR = 3;
const PLAYER_SCALE_FACTOR = 2.4;
const BRICK_HEIGHT_SCALE_FACTOR = 3.2;

const gridCol = STRWALL_WIDTH * SCALE_FACTOR;
const gridRow = STRWALL_HEIGHT * SCALE_FACTOR;

const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 17;

const DOOR_HEIGHT = 14;
const DOOR_WIDTH = 14;

const BOMB_HEIGHT = 16;
const BOMB_WIDTH = 16;

const EXPLOSION_WIDTH = 16;
const EXPLOSION_HEIGHT = 16;

const ESPEED = 4;

const numCols = Math.floor(WINDOW_WIDTH / gridCol);
const numRows = Math.floor(WINDOW_HEIGHT / gridRow);

const playerSprite = [playerImg, playerDeathImg];

const playerMoveLeft = [3, 19, 35];
const playerMoveRight = [49, 67, 82];
const playerMoveDown = [97, 113, 129];
const playerMoveUp = [145, 161, 176];

const playerDeathSprite = [2, 18, 33, 50, 65, 80, 98];

const brickSprite = [0, 18, 36, 54, 72, 90, 108];

const bombSprite = [2, 20, 37];

const ballonMoveLeft = [0, 18, 33];
const ballonMoveRight = [65, 80, 96];
const BallonDeath = [49, 49, 49];

const ballonLeftSize = [
  { x: 16, y: 14 },
  { x: 14, y: 15 },
  { x: 14, y: 16 },
];
const ballonRightSize = [
  { x: 14, y: 16 },
  { x: 14, y: 15 },
  { x: 16, y: 14 },
];
const ballonMiddleSize = [
  { x: 14, y: 16 },
  { x: 14, y: 16 },
  { x: 14, y: 16 },
];

const cookieMoveLeft = [1, 18, 35];
const cookieMoveRight = [69, 86, 103];
const cookieDeath = [52, 52, 52];

const cookieLeftSize = [
  { x: 16, y: 16 },
  { x: 16, y: 16 },
  { x: 16, y: 16 },
];
const cookieRightSize = [
  { x: 16, y: 16 },
  { x: 16, y: 16 },
  { x: 16, y: 16 },
];
const cookieMiddleSize = [
  { x: 16, y: 16 },
  { x: 16, y: 16 },
  { x: 16, y: 16 },
];

const barrelMoveLeft = [1, 20, 38];
const barrelMoveRight = [74, 92, 109];
const barrelDeath = [56, 56, 56];

const barrelLeftSize = [
  { x: 16, y: 12 },
  { x: 14, y: 14 },
  { x: 14, y: 16 },
];
const barrelRightSize = [
  { x: 14, y: 16 },
  { x: 14, y: 14 },
  { x: 16, y: 12 },
];
const barrelMiddleSize = [
  { x: 14, y: 16 },
  { x: 14, y: 16 },
  { x: 14, y: 16 },
];

const ghostMoveLeft = [0, 17, 33];
const ghostMoveRight = [65, 81, 97];
const ghostDeath = [49, 49, 49];

const ghostLeftSize = [
  { x: 16, y: 15 },
  { x: 14, y: 16 },
  { x: 14, y: 16 },
];
const ghostRightSize = [
  { x: 14, y: 16 },
  { x: 14, y: 16 },
  { x: 16, y: 15 },
];
const ghostMiddleSize = [
  { x: 14, y: 16 },
  { x: 14, y: 16 },
  { x: 14, y: 16 },
];

const ballonSize = [ballonLeftSize, ballonMiddleSize, ballonRightSize];
const barrelSize = [barrelLeftSize, barrelMiddleSize, barrelRightSize];
const cookieSize = [cookieLeftSize, cookieMiddleSize, cookieRightSize];
const ghostSize = [ballonLeftSize, ghostMiddleSize, ghostRightSize];

const enemyDeathSprite = [1, 17, 32];

const ballonImgSprite = [ballonImg, enemyDeathImg];
const ballonSprite = [
  ballonMoveLeft,
  ballonMoveRight,
  enemyDeathSprite,
  BallonDeath,
];

const cookieImgSprite = [cookieImg, enemyDeathImg];
const cookieSprite = [
  cookieMoveLeft,
  cookieMoveRight,
  enemyDeathSprite,
  cookieDeath,
];

const barrelImgSprite = [barrelImg, enemyDeathImg];
const barrelSprite = [
  barrelMoveLeft,
  barrelMoveRight,
  enemyDeathSprite,
  barrelDeath,
];

const ghostImgSprite = [ghostImg, enemyDeathImg];
const ghostSprite = [
  ghostMoveLeft,
  ghostMoveRight,
  enemyDeathSprite,
  ghostDeath,
];

const Powerups = [
  speedPowerUPImg,
  destroyAllPowerUpImg,
  additionalBombPowerUpImg,
];

const horizontalExplosion = [1, 19, 37, 55];
const verticalExplosion = [4, 22, 37, 55];
const centerExplosion = [1, 19, 37, 55];

const url = "https://Bomberman-Backend.toxicann.repl.co";

const SCORE_BRICK_INCREMENT = 10;
