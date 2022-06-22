const WINDOW_WIDTH = 1485;
const WINDOW_HEIGHT = 765;

const STRWALL_WIDTH = 15;
const STRWALL_HEIGHT = 17;
const SCALE_FACTOR = 3;
const PLAYER_SCALE_FACTOR = 2.5;

const gridCol = STRWALL_WIDTH * SCALE_FACTOR;
const gridRow = STRWALL_HEIGHT * SCALE_FACTOR;

const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 17;

const SPEED = 4;

const numCols = Math.floor(WINDOW_WIDTH / gridCol);
const numRows = Math.floor(WINDOW_HEIGHT / gridRow);

const playerMoveLeft = [3, 19, 35];
const playerMoveRight = [49, 67, 82];
const playerMoveDown = [97, 113, 129];
const playerMoveUp = [145, 161, 176];
