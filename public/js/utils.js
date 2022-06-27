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
  console.log(x, y);
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;
  return [Math.floor(mouseX / gridCol), Math.floor(mouseY / gridRow)];
};
