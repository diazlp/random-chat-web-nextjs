/**
 * Formats a number by adding a thousand separator (comma) for better readability.
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} - The formatted number as a string with a thousand separator.
 */
const formatNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatNumber;
