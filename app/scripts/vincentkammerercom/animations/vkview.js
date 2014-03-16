'use strict';

angular.module('vincentkammerercomApp')
	.animation('.vkview',[
		'$rootScope',
		function(
			$rootScope
		){
			return {
				enter: function(element, done) {
				},
				leave: function(element, done) {
					element.remove();
				},
				removeClass: function(element, className, done) {
				}
			};
		}
	]);

angular.module('vincentkammerercomApp')
	.animation('.navshown',[
		'$rootScope',
		function(
			$rootScope
		){

			var vkviewContainer = angular.element(document.querySelector('.vkviewContainer'));

			return {
				addClass: function(element, className, done) {
					var style = 'translate3d(0,' + $rootScope.navheight + 'px,0)';
					vkviewContainer.css('webkitTransform', style);
				},
				removeClass: function(element, className, done) {
					var style = 'translate3d(0,0,0)';
					vkviewContainer.css('webkitTransform', style);
				}
			};
		}
	]);
