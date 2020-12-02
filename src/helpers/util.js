/**
 * Returns the number of non empty arrays.
 *
 * Thanks to Karl Rathmanner
 * @param  {...any} arrays Any number of arrays
 */
export const numberOfNonEmptyArrays = (...arrays) => {
  return arrays.reduce((accumulator, currentArray) => {
    return accumulator + Math.min(currentArray.length, 1);
  }, 0);
};
