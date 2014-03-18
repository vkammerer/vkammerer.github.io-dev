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
					scope.loading = 'Loading Phaser';
					if ($rootScope.isMobile) {
						document.documentElement.webkitRequestFullScreen();
					}
					var iframe = document.getElementById('phaseriframe');

					var messageIn = function(ev){
						if(ev.origin === window.location.origin) {
							var data = JSON.parse(ev.data);
							if(data.action === 'started') {
							} else {
								console.log("Unknown message: "+ev.data);
							}
						}
					}

					window.addEventListener('message', messageIn, false);

					var messageOut = function(data){
						var message = JSON.stringify(data);
						iframe.contentWindow.postMessage(message, window.location.origin);
					}

					scope.exitFullScreen = function(ev){
						document.webkitExitFullscreen();
					}
					scope.startGame = function(){
						$rootScope.stage = 'phaser';
						scope.gameon = true;
						messageOut({action: 'start'});
						iframe.contentWindow.focus();
					}

					scope.$on('keydownName', function(ev,name){
						if (name === 'space'){
							scope.startGame();
						}
					})

				}
			};
	}]);

