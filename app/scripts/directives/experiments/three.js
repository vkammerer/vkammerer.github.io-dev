'use strict';

angular.module('vincentkammerercomApp')
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
				templateUrl: 'views/experiments/three.html',
				restrict: 'E',
				controller : function($scope){
					keydownNames.init();
				},
				link: function(scope, element, attrs) {


				}
			};
	}]);
