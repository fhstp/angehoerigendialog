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

/**
   * `Standard usage: Lorem **ipsum** dolor *sit amet*, consectetur **dolor sit**.

  Escaping: Use \\*backslashes\\*. (Note: the backslash has to be escaped in this js string. Users would only have to use a single one.)
  Gender_gap and Gender*sternchen are escaped automatically.
  Bonus rule: Control characters can't initiate a span when they are followed by whitespace. 2 * 3 * 7 = 42.
  (Or end one when they are preceeded by whitespace)

  Supports ridiculous formatting: ***BOLD AND ITALIC MEANS IT'S IMPORTANT!!!***.

  __Underscores__ _can_ be used instead of asterisks. Because that's how ___markdown___ does it.

  **You can also *nest* stuff, because why *not*?**
  *(And it works **both** ways, of **course**)*

  **Multiline blocks
  are just fine,
  too.**

  **Mixing _underscores_ and asterisks** is something you *__can__* do, __*if*__ you feel adventurous.
  But this does *exactly what __you* tell it to do__, which *__may*__ result in bad HTML and tears.
  (Even though browsers will try render the overlapping tags "correctly".)

  **** * * * I ❤ regular expressions. * * * ****`
 */
export const convertMarkdown = str => {
  return str
    .replace(/([a-z]|[A-Z])([*_])([a-z]|[A-Z])/g, '$1\\$2$3') // Autoescape Gendergap and Gendersternchen - warning: this disables italics inside words!
    .replace(
      /([^\\]|^)(\*\*\*|___)(?![ ])([^]*?)(?:([^\\ ])\2)/gm,
      '$1<strong><i>$3$4</i></strong>'
    ) // Consume combined strong and italics markers first, so tags are nested correctly
    .replace(
      /([^\\]|^)(\*\*|__)(?![ ])([^]*?)(?:([^\\ ])\2)/gm,
      '$1<strong>$3$4</strong>'
    ) // Add strong tags
    .replace(/([^\\]|^)([*_])(?![ ])([^]*?)(?:([^\\ ])\2)/gm, '$1<i>$3$4</i>') // Add italics tags
    .replace(/\\([*_])/gm, '$1')
    .replace(/\n/g, '<br>');
};
