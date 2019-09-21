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

/**
 * Returns variance of a list of numbers
 * 
 * @param {Array.<number>} arr A list of numbers
 * 
 * @return {number} Variance of the list of numbers
 */
function variance(arr) {
    var mean = sum(arr)/arr.length;
    return sum(arr.map(n => Math.pow(n-mean, 2)))/(arr.length-1);
}

module.exports = {sum, variance};