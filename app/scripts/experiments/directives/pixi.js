'use strict';

angular.module('experimentsApp')
	.directive('pixi', [
		'$window',
		'$rootScope',
		'keydownNames',
		'experimentsloader',
		function (
			$window,
			$rootScope,
			keydownNames,
			experimentsloader
		){

			return {
				templateUrl: 'views/experiments/pixi.html',
				restrict: 'E',
				controller : function($scope){
					keydownNames.init();
				},
				link: function(scope, element, attrs) {

					experimentsloader.load('PIXI').then(function(){

						var originalWidth = 1000;
						var originalHeight = 1000;

						var scaleDir = 1;
						var currentScale = 0.3;
						var minScaleFactor = 0;
						var maxScaleFactor = 1;

						var $vkPixi = element.find('p');
						var vkPixi = $vkPixi[0];
						if ($vkPixi.find('canvas').length > 0) {
							return;
						}
						var actualWidth = vkPixi.clientWidth;

						if (originalWidth > actualWidth) {
							var dimRatio = actualWidth / originalWidth;
						}
						else  {
							dimRatio = 1;
						}

						var actualHeight = originalHeight * dimRatio;

						$window.VK.PIXI = $window.VK.PIXI || {}
						$window.VK.PIXI.stage = $window.VK.PIXI.stage || new PIXI.Stage(0xFFFFFF);
						$window.VK.PIXI.renderer = $window.VK.PIXI.renderer || PIXI.autoDetectRenderer(actualWidth, actualHeight, null, true, true);

						vkPixi.appendChild($window.VK.PIXI.renderer.view);


						$window.VK.PIXI.vinces = $window.VK.PIXI.vinces || [];
						$window.VK.PIXI.container = $window.VK.PIXI.container || new PIXI.SpriteBatch();

						if (!$window.VK.PIXI.vinces.length) {
							for(var i = 0; i < 5; i++) {
								$window.VK.PIXI.vinces[i] = new PIXI.Sprite.fromImage('/images/vince.png');
								$window.VK.PIXI.vinces[i].anchor.x = 0.5;
								$window.VK.PIXI.vinces[i].anchor.y = 0.5;
								$window.VK.PIXI.vinces[i].position.x = (actualWidth * (i * 0.2 + 0.1));
								$window.VK.PIXI.vinces[i].position.y = actualHeight / 2;
								$window.VK.PIXI.vinces[i].scale = new PIXI.Point(currentScale,currentScale);
								$window.VK.PIXI.container.addChild($window.VK.PIXI.vinces[i]);
							}

							$window.VK.PIXI.stage.addChild($window.VK.PIXI.container);

						}

						var isScopeActive = true;

						scope.$on('$destroy', function(ev,name){
							isScopeActive = false;
						})

						scope.$on('keydownName', function(ev,name){
	//						console.log(name);
						})

						function animate() {
							if (isScopeActive) {
								requestAnimFrame( animate );
							}

							scaleDir = ((currentScale < maxScaleFactor) && (currentScale > minScaleFactor)) ? scaleDir : -scaleDir;

							for(var i = 0; i < 5; i++) {
								$window.VK.PIXI.vinces[i].scale.x = currentScale;
								$window.VK.PIXI.vinces[i].scale.y = currentScale;
								$window.VK.PIXI.vinces[i].rotation += 0.1;
							}
							currentScale = currentScale + (scaleDir * 0.01);
							if (isScopeActive) {
								$window.VK.PIXI.renderer.render($window.VK.PIXI.stage);
							}
						}

						animate();
					});

				}
			};
	}]);
