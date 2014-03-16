'use strict';

angular.module('vincentkammerercomApp')
	.directive('social', [
			'smicons',
		function (
			smicons
		){
		return {
			templateUrl: 'views/vincentkammerercom/components/social.html',
			restrict: 'E',
			link: function(scope, element, attrs) {
				scope.smicons = smicons;
			}
		};
	}]);
