'use strict';

angular.module('experimentsApp')
	.factory('keydownNames', [
		'$rootScope',
		function(
			$rootScope
		){

			var getKeyCodeName = function(ev){
				var toReturn;
				if (ev.keyCode === 37) {
					toReturn = 'left';
				}
				else if (ev.keyCode === 38) {
					toReturn = 'up';
				}
				else if (ev.keyCode === 39) {
					toReturn = 'right';
				}
				else if (ev.keyCode === 40) {
					toReturn = 'down';
				}
				else if (ev.keyCode === 32) {
					toReturn = 'space';
				}
				return toReturn;
			};

			var init = function(){
				$rootScope.keydownNames = $rootScope.keydownNames || function(ev){
					$rootScope.$broadcast('keydownName', getKeyCodeName(ev));
				};
			};

			return {
				init: init
			};
		}
	]);

angular.module('experimentsApp')
	.factory('experimentsloader', [
		'$window',
		'$q',
		function(
			$window,
			$q
		){

			var libUrls = {
				Phaser: '/bower_components/phaser/phaser.js',
				PIXI: 'bower_components/pixi/bin/pixi.dev.js',
				THREE: 'bower_components/threejs/build/three.min.js'
			};

			var load = function(lib){
				var thisDefer = $q.defer();
				if (!$window[lib]) {
					require([libUrls[lib]], function(data) {
						if (data) {
							$window[lib] = data;
						}
						thisDefer.resolve();
					});
				}
				else {
					thisDefer.resolve();
				}
				return thisDefer.promise;
			};

			return {
				load: load
			};
		}
	]);
