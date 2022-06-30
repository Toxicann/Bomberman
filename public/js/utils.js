/**
 * The function returns a random integer between the min and max values.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number of the range.
 * @returns a random number between the min and max values.
 */
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * It takes a number and returns a string with the number and the string "px" appended to it.
 * @param value - The value to convert to pixels.
 * @returns A string with the value of the argument and the string 'px' appended to it.
 */
const toPx = (value) => {
  return `${value}px`;
};

/**
 * It takes an array, filters out all the undefined values, and returns the new array
 * @param array - the array you want to clean
 * @returns a new array with all the undefined values removed.
 */
const cleanArr = (array) => {
  return array.filter((enemy) => {
    return enemy !== undefined;
  });
};

/**
 * It returns true if the array contains undefined, otherwise it returns false.
 * @param arr - The array to check.
 * @returns true
 */
const containsUndefined = (arr) => {
  return arr.includes(undefined);
};

/**
 * Get the coordinates of the mouse click relative to the canvas element.
 * @param event - The event object that is passed to the event handler.
 * @returns An array of two numbers.
 */
const getCoordinates = (e) => {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;
  return [Math.floor(mouseX / gridCol), Math.floor(mouseY / gridRow)];
};

/**
 * It takes a JSON object and a method (GET, POST, PUT, DELETE) and returns an object with the method,
 * headers, and body.
 * @param jsonBody - The JSON object that you want to send to the server.
 * @param method - The HTTP method to use.
 * @returns An object with the method, headers, and body.
 */
const options = (jsonBody, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  };
};

/* Adding an event listener to each button in the button group. */
var btns = btnGroup.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/**
 * When the delete button is clicked, toggle the active class on the delete button.
 */
const toggleDelete = () => {
  remove.classList.toggle("active");
};

/**
 * It removes dead enemies from the enemyObjArr array.
 */
const removeDeadEnemies = () => {
  for (let i = 0; i < enemyObjArr.length; i++) {
    if (!enemyObjArr[i].isAlive) {
      enemyObjArr.splice(i, 1);
    }
  }
};

/**
 * It removes objects from an array if they are destroyed.
 * @param arr - The array you want to remove objects from
 */
const removeObjects = (arr, index) => {
  arr.splice(index, 1);
};

/**
 * If the brick at the given index is destroyed, remove it from the array.
 * @param arr - the array of bricks
 * @param index - the index of the brick in the array
 */
const removeBricks = (arr, index) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[index].isDestroyed) {
      arr.splice(index, 1);
    }
  }
};

/**
 * It removes all bombs from the array if the bomb at the given index is exploded.
 * @param arr - the array of bombs
 * @param index - the index of the bomb that exploded
 */
const removeBombs = (arr, index) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[index].isExploded) {
      arr.splice(index, 1);
    }
  }
};

/**
 * It takes a high score, and sends it to the server to be saved
 * @param highScore - the score that the user got
 */
const setHighScore = (highScore) => {
  fetch(`${url}/save_highscore`, options({ Highscore: highScore }, "POST"))
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

/**
 * It fetches the highscore from the database and then sets the highscore to the value that was
 * fetched.
 */
const getHighScore = () => {
  fetch(`${url}/load_highscore`).then((res) => {
    res.json().then((data) => {
      highScore = data[0].Highscore;

      setTimeout(() => {
        HIGHSCORE.innerText = `Highscore: ${highScore}`;
      }, 1000);
    });
  });
};
