# Big-number-filter-angularjs
Changes a numeric input with a measure. For example: 1000 becomes 1K or 1Kg, according to user selected options.
It could be useful when, in an application, is necessary to change a numeric input to show a measure, or a shorter number because space in row is not sufficient for very large numbers.

## How to use
Inject Big Number Filter in your module:
```javascript
    angular.module('yourModule', ['bigNumberManagement'])
 ```

Use the filter in your template:
```javascript
    {{ yourNumericValue | bigNumberFilter:'{"states":"KMB","start":1000,"steps":1000,"filter":true}'}}
```   
Example:
```javascript
    {{ 100000 | bigNumberFilter:'{"states":"KMB","start":1000,"steps":1000,"filter":true}'}}
    // will show 100K
```   
(*see options to know more*)

## Options
You can choose some parameters for the filter (*others arriving*). Parameters have to be *JSON style*, with strings as properties and strings/numbers/booleans as values.
- **states:** the labels for elaborated string (for example 'Kg', 'hm', 'l', etc.). **Type:** String|Array **Default:** 'KMB' **Please note:** if states are single-character, they can be all in a string without comma ('KMB'); if not, they have to be separated by comma:
```javascript
    {{yourNumericValue | bigNumberFilter:'{"states":"m,dam,hm,Km"}' }} // with string
    // or 
    {{yourNumericValue | bigNumberFilter:'{"states":["m","dam","hm","Km"]}' }} // with array
```   
- **start:** the minimum value to start elaborating final string. For values under that, no change will be done (except if filter is true). **Type:** Number **Default:** 100,000
- **steps:** number for change of state: for example, 1,000 to pass from K to M and from M to B, 10 to pass from hg to Kg. **Type:** Number **Default:** 1,000
- **filter:** option to know if an angularjs number filter should be applied to output. **Type:** Boolean **Default:** false
