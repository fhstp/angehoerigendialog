/**
 * convert a string's first character to upper case
 * @param {string} string
 */
export const string_toTitleCase = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

/**
 * set the height of a textarea according to its content
 * @param {HTMLElement} element - the textarea which should be resized
 * @param {number} padding - top and button padding of the element
 */
export const string_autosetTextareaHeight = (element, padding = 0) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight + padding}px`;
};
