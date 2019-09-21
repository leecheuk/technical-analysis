/**
 * Returns the sum of array
 * 
 * @param {Array.<number>} arr A list of numbers
 * 
 * @return {number} Sum of the list of numbers
 */
function sum(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}

module.exports = {sum};