'use strict';

angular.module('experimentsApp')
	.directive('phaser', [
		'$window',
		'$rootScope',
		'keydownNames',
		function (
			$window,
			$rootScope,
			keydownNames
		){

			return {
				templateUrl: 'views/experiments/directives/phaser.html',
				restrict: 'E',
				controller : function($scope){
					keydownNames.init();
				},
				link: function(scope, element, attrs) {

					scope.gameon = false;
					scope.loading = true;

					var iframe = document.getElementById('phaseriframe');

					var messageIn = function(ev){
						if(ev.origin === window.location.origin) {
							var data = JSON.parse(ev.data);
							if(data.state === 'ready') {
								scope.loading = false;
								scope.$apply();
							} else {
								console.log("Unknown message: "+ev.data);
							}
						}
					}

					var messageOut = function(data){
						var message = JSON.stringify(data);
						iframe.contentWindow.postMessage(message, window.location.origin);
					}

					scope.enterFullScreen = function(){
						document.documentElement.webkitRequestFullScreen();
					}
					scope.exitFullScreen = function(){
						document.webkitExitFullscreen();
					}
					scope.startGame = function(){
						scope.gameon = true;
						iframe.contentWindow.focus();
					}

					window.addEventListener('message', messageIn, false);

					if ($rootScope.isMobile) {
						document.documentElement.webkitRequestFullScreen();
					}
					scope.$on('keydownName', function(ev,name){
						if (name === 'space'){
							scope.startGame();
						}
					})

				}
			};
	}]);

