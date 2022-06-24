/**
 * The function returns a random integer between the min and max values.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number of the range.
 * @returns a random number between the min and max values.
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
