'use strict';

angular.module('wwwApp')
	.filter('filterByParamId', function() {
		return function(input, param, id) {
			var toReturn = [];
			var i=0, len=input.length;
			for (; i<len; i++) {
				if (input[i][param]._id === id) {
					toReturn.push(input[i]);
				}
			}
			return toReturn;
		};
	});

angular.module('wwwApp')
	.filter('getById', function() {
		return function(input, id) {
			var i=0, len=input.length;
			for (; i<len; i++) {
				if (input[i]._id === id) {
					return input[i];
				}
			}
			return null;
		};
	});
