'use strict';

angular.module('wwwApp')
	.directive('navigation', [
		'$rootScope',
		'$http',
		'$location',
		function (
			$rootScope,
			$http,
			$location
		){
			return {
				templateUrl: 'views/navigation.html',
				restrict: 'E',
				controller : function($scope){
				},
				link: function(scope, element, attrs) {
				}
			};
	}]);
