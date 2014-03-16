'use strict';

angular.module('vincentkammerercomApp')
	.directive('header', [
		'$rootScope',
		'$http',
		'$location',
		function (
			$rootScope,
			$http,
			$location
		){
			return {
				templateUrl: 'views/vincentkammerercom/components/header.html',
				restrict: 'E',
				controller : function($scope){
				},
				link: function(scope, element, attrs) {
				}
			};
	}]);
