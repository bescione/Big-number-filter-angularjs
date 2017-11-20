(function () {
  'use strict';
  
  angular.module('bigNumberManagement', []);

  /**
   * The filter that acts to manage big numbers
   */
  angular.module('bigNumberManagement')
    .factory('BigNumberFactory', ['$filter', BigNumberFactory])
    .filter('bigNumberFilter', ['$filter', 'BigNumberFactory', bigNumberFilter]);

  function BigNumberFactory($filter) {
    var self = this;
    var factory = {};
    this.obj = {};

    /**
     * Checks if filter's input is a Number and returns it, returns false instead
     * @param input
     * @return {Number | boolean}
     */
    var detectNumber = function detectNumber(input) {
      try {
        if(angular.isNumber(input) || !Number.isNaN(input)) return input;
        else if(!Number.isNaN(Number.parseInt(input))) return Number.parseInt(input);
        else return false;
      }
      catch(e) { return false; }
    };

    /**
     * Elaborates possible states (they could be 'KMB' or 'dag,hg,Kg' or 'm,dam,Hm,Km', etc.
     * @param states
     * @return {*}
     */
    var makeStates = function makeStates(states) {
      if(Array.isArray(states)) return states;
      else if(angular.isString(states)) { return Array.from(states); }
      else { return states; }
    };

    /**
     * Based on indicators parameter in filter, changes
     * @param indicators
     * @return {Array}
     */
    var makeIndicators = function makeIndicators(indicators) {
      var thereAreIndicators = angular.isDefined(indicators), properties, start, steps, states, filter;
      try { properties = thereAreIndicators ? JSON.parse(indicators) : {}; }
      catch(e) { properties = {}; }
      start = properties.start || 100000;
      steps = properties.steps || 1000;
      states = properties.states ? makeStates(properties.states) : ['K', 'M', 'B'];
      filter = properties.filter || false;

      return {start:start, steps:steps, states:states, filter:filter};
    };

    /**
     * Given filter's input, returns the elaborated string with correct state
     * @param input
     * @param indicators
     * @return {String | boolean}
     */
    factory.makeFiltered = function makeFiltered(input, indicators) {
      var items = angular.copy(input);
      // var newIndicators = makeIndicators(indicators);
      self.obj = angular.extend(self.obj, { isNumber : detectNumber(items) });
      if(self.obj.isNumber!== false) {
        var count, /*startingPoint, length = items.toString().split('').length,*/
            newIndicators = makeIndicators(indicators);

        switch(true) {
          case items < newIndicators.start :
            count = newIndicators.filter ? $filter('number')(items) : items;
            return count;
            break;

          case items >= newIndicators.start :
            var i=0, newSteps = newIndicators.steps, state;
            while(items/newSteps > newIndicators.steps) {
              newSteps = newSteps * newIndicators.steps;
              i++;
            }
            count = items/newSteps;
            state = angular.isDefined(newIndicators.states[i]) ? newIndicators.states[i] : newIndicators.states[newIndicators.states.length-1];
            return count.toString().split('.')[0] + state;
            break;

          default :
            return items;
            break;
        }
      }
      else {
        return self.obj.isNumber;
      }
    };

    return factory;
  }





  function bigNumberFilter($filter, BigNumberFactory) {
    return function bigNumberFiltersExecute(input, indicators) {
      var filtered = BigNumberFactory.makeFiltered(input, indicators);
      return filtered || input;
    }
  }

})();
