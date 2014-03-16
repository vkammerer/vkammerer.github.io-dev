'use strict';

angular.module('utilsApp')
	.directive('pre', [
		function (
		){
			return {
				restrict: 'E',
				controller : function($scope){
				},
				link: function(scope, element, attrs) {
					if (element.hasClass('transclude')) {
						element.replaceWith(element[0].innerText);
					}
				}
			};
		}
	]);
