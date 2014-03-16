'use strict';

angular.module('vincentkammerercomApp')
	.directive('phaser', [
		'$window',
		'$rootScope',
		'experimentsloader',
		'keydownNames',
		function (
			$window,
			$rootScope,
			experimentsloader,
			keydownNames
		){

			return {
				templateUrl: 'views/experiments/phaser.html',
				restrict: 'E',
				controller : function($scope){
					keydownNames.init();
				},
				link: function(scope, element, attrs) {

					scope.loading = 'Loading Phaser';

					var	isPhaserLoaded = false;
					scope.isGameBooted = false;

					experimentsloader.load('Phaser').then(function(){
						scope.loading = 'Phaser loaded';
						isPhaserLoaded = true;
					})

					scope.$on('keydownName', function(ev,name){
						if (
							(name === 'space')
							&& isPhaserLoaded
							&& (!scope.isGameBooted)
						){
							gameBoot();
							scope.isGameBooted = true;
						}
					})
					scope.$on('$destroy', function(){
						scope.isGameBooted = false;
					})

					var gameBoot = function(){

						var gameContainer = element.find('p');
						var gWidth = gameContainer[0].offsetWidth;
						var gHeight = gameContainer[0].offsetHeight;
						var score_style = { font: "30px Arial", fill: "#ffffff" };

						$window.VK.PHASER = new Phaser.Game(gWidth, gHeight, Phaser.AUTO, gameContainer[0]);

						var boot_state = {

							preload: function() {
								this.game.stage.backgroundColor = '#000000';
								this.game.load.image('bird', 'images/vince2.png');
								this.game.load.image('pipe', 'images/vince2.png');

								this.game.physics.arcade.gravity.y = 1000;
								this.game.load.script('filter', 'scripts/lib/phaser/filters/LightBeam.js');

							},
							create: function() {
								this.game.state.start('main');
							}
						};

						var main_state = {

							create: function() {

								this.bird = this.game.add.sprite(100, 245, 'bird');
								this.game.physics.enable( [ this.bird ], Phaser.Physics.ARCADE);

//								this.bird.body.mass = 1000;
								console.log(this.bird.body);

								var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
								space_key.onDown.add(this.jump, this);

								this.pipes = this.game.add.group();
								this.pipes.createMultiple(40, 'pipe');
								this.game.physics.enable( this.pipes.children, Phaser.Physics.ARCADE);

								// Timer that calls 'add_pipes' ever 1.5 seconds
								this.timer = this.game.time.events.loop(1500, this.add_pipes, this);
								this.score = 0;
								this.label_score = this.game.add.text(20, 20, "0", score_style);

								this.background = this.add.sprite(0, 0);
								this.background.width = this.game.width;
								this.background.height = this.game.height;

								this.filter = this.add.filter('LightBeam', this.game.width, this.game.height );

								//	You have the following values to play with (defaults shown):
								this.filter.alpha = 0.0;
								this.filter.red = 1.0;
								this.filter.green = 1.0;
								this.filter.blue = 2.0;
								this.filter.thickness = 70.0;
								this.filter.speed = 1.0;

								this.background.filters = [this.filter];

							},

							update: function() {
								this.filter.update();
								if (this.bird.inWorld === false) {
									this.restart_game();
								}
								this.game.physics.arcade.overlap(this.bird, this.pipes, this.restart_game, null, this);
							},

							jump: function() {
								this.bird.body.velocity.y = -350;
							},

							restart_game: function() {
								// Remove the timer
								this.game.time.events.remove(this.timer);
								this.game.state.start('main');
							},

							// Add a pipe on the screen
							add_pipe: function(x, y) {

								var pipe = this.pipes.getFirstDead();
								pipe.checkWorldBounds = true;
								pipe.outOfBoundsKill = true;

								pipe.events.onOutOfBounds.add(function(){
									console.log('yay');
								})


								pipe.reset(x, y);

								 // Add velocity to the pipe to make it move left
								pipe.body.velocity.x = -200;
								pipe.body.allowGravity = false;

							},

							add_pipes: function() {
								var hole = Math.floor(Math.random()*6)+1;

								for (var i = 0; i < 9; i++) {
									if (i != hole && i != hole +1 && i != hole +2) {
										this.add_pipe(gWidth, i*55 + 5);
									}
								}
								this.score += 1;
								this.label_score.text = this.score.toString();
								console.log(this.label_score);
							},
						};

						$window.VK.PHASER.state.add('boot', boot_state);
						$window.VK.PHASER.state.add('main', main_state);
						$window.VK.PHASER.state.start('boot');

					}
				}
			};
	}]);


