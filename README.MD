# Technical Analysis
Some functions for stock technical analysis. 

## Usage
To get RSI for series of prices, use the getRSI method.
```javascript
var {getRSI} = require('./technical-analysis');
var data = {
    '2016-12-21': 111.874626742,
    '2016-12-22': 110.78251272859,
    '2016-12-23': 110.73461299116,
    '2016-12-27': 111.59680826491,
    '2016-12-28': 111.31898978781,
    '2016-12-29': 111.51058873753,
    '2016-12-30': 110.58133383139
};
var rsi = getRSI(d, 3); 
```
rsi will have value of the following.
```javascript
{
  '2016-12-28': 72.58064516115435,
  '2016-12-29': 79.1366906472821,
  '2016-12-30': 13.698630136947301
}
```