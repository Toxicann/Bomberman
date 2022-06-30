gameInfo.style.width = toPx(WINDOW_WIDTH - 4);
gameInfo.style.height = toPx(60);

levelEditor.style.width = toPx(WINDOW_WIDTH - 4);
levelEditor.style.height = toPx(60);

levelLoader.style.width = toPx(WINDOW_WIDTH);
levelLoader.style.height = toPx(WINDOW_HEIGHT);

timer.innerHTML = "Time: ";
gameInfo.appendChild(timer);

score.innerHTML = "Score: 0";
gameInfo.appendChild(score);

life.innerHTML = "Lives: 0";
gameInfo.appendChild(life);

context.webkitImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
