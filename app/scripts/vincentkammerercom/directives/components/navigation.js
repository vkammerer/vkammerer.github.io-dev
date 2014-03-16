'use strict';

angular.module('vincentkammerercomApp')
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
				templateUrl: 'views/vincentkammerercom/components/navigation.html',
				restrict: 'E',
				controller : function($scope){
				},
				link: function(scope, element, attrs) {
					var thisNav = angular.element(document.querySelector('nav'));
					scope.$watchCollection('posts', function(){
						scope.$evalAsync(function(){
							$rootScope.navheight = thisNav[0].scrollHeight;
						})
					})
					scope.locationpath = $location.$$path;
					$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
						scope.locationpath = $location.$$path;
					})
				}
			};
	}]);
