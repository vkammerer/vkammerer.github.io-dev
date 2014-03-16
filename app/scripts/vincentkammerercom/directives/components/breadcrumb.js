'use strict';

angular.module('vincentkammerercomApp')
	.directive('breadcrumb', [
		'$rootScope',
		'$http',
		'$location',
		function (
			$rootScope,
			$http,
			$location
		){

			return {
				templateUrl: 'views/vincentkammerercom/components/breadcrumb.html',
				restrict: 'E',
				controller : function($scope){
				},
				link: function(scope, element, attrs) {
				}
			};
	}]);
