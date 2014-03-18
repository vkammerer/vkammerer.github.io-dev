'use strict';

angular.module('experimentsApp')
	.directive('three', [
		'$window',
		'$rootScope',
		'keydownNames',
		function (
			$window,
			$rootScope,
			keydownNames
		){

			return {
				templateUrl: 'views/experiments/directives/three.html',
				restrict: 'E',
				controller : function($scope){
					keydownNames.init();
				},
				link: function(scope, element, attrs) {
				}
			};
	}]);
