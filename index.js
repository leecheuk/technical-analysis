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

/**
 * Simple moving average method.
 * 
 * @param {Object.<string, number>} data Collection of closing price of trading days 
 * @param {number} days Number of time periods in days
 * 
 * @return {Object.<string, number>} Collection of average closing price for trading days
 */
function simpleMovingAverage(data, days) {
    var temp = [];
    var sma = {}
    var prices = Object.entries(data)
    for (var [i, [date, price]] of prices.entries()) {
        temp.push(price);
        if (i+1 == days) {
            sma[date] = sum(temp)/temp.length;
        } else if (i+1 > days) {
            temp.shift();
            sma[date] = sum(temp)/temp.length;
        }
    }
    return sma;
}

/**
 * Return the Bollinger bands from the data.
 * 
 * @param {Object.<string, number>} data Collection of closing price of trading days 
 * @param {number} days Number of time periods in days
 * @param {number} n Number of standard deviations away from average
 * 
 * @return {Object.<string, Array.<number, number>>} Collection of upper and lower Bollinger band of trading days
 */
function bollingerBand(data, days, n) {
    // {date, upper_bollinger_band, lower_bollinger_band}
    var temp = [];
    var bb = {}
    var prices = Object.entries(data)
    for (var [i, [date, price]] of prices.entries()) {
        temp.push(price);
        if (i+1 == days) {
            var average = sum(temp)/temp.length;
            var v = variance(temp);
            bb[date] = [average-n*Math.sqrt(v), average+n*Math.sqrt(v)];
        } else if (i+1 > days) {
            temp.shift();
            var average = sum(temp)/temp.length;
            var v = variance(temp);
            bb[date] = [average-n*Math.sqrt(v), average+n*Math.sqrt(v)];
        }
    }
    return bb;
}

/**
 * Calculate RSI from price data
 * 
 * @param {Object.<string, number>} data Price data of stock for each trading day
 * @param {number} n Number of days for the averages
 * 
 * @return {Object.<string, number>} Collection of RSI values corresponding to each trading day
 */
function getRSI(data, n) {
    var temp = [];
    var prices = Object.entries(data).slice(0, 29);
    var prev_price;
    var RSI = {};
    for ([i, [date, price]] of prices.entries()) {
        var change;
        if (i !== 0 && temp.length < n) {
            change = price - prev_price;
            temp.push(change);
        } else if (i !== 0 && temp.length == n) {
            change = price - prev_price;
            temp.shift();
            temp.push(change);
            gains = temp.filter(g => g > 0);
            losses = temp.filter(l => l < 0);
            average_gain = gains.length > 0 ? sum(gains)/n : 0;
            average_loss = losses.length > 0 ? Math.abs(sum(losses))/n : 0;
            RS = average_gain/average_loss;
            RSI[date] = RS === Infinity ? 100 : 100 - (100 / (1 + RS));
        } 
        prev_price = price;
    }
    return RSI;
}

module.exports = {sum, variance, simpleMovingAverage, bollingerBand, getRSI};