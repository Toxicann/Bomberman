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

const brickGridCol = BRICK_WIDTH * SCALE_FACTOR;
const brickGridRow = BRICK_HEIGHT * SCALE_FACTOR;

const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 17;

const DOOR_HEIGHT = 14;
const DOOR_WIDTH = 14;

const BOMB_HEIGHT = 16;
const BOMB_WIDTH = 16;

const SPEED = 4;

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
