
var load = function(){

	var gWidth = document.body.scrollWidth;
	var gHeight = document.body.scrollHeight;

	var score_style = { font: "30px Arial", fill: "#ffffff" };

	window.PHASER = new Phaser.Game(gWidth, gHeight, Phaser.AUTO, document.body);

	var boot_state = {

		preload: function() {
			this.game.stage.backgroundColor = '#000000';
			this.game.load.image('bird', '/images/experiments/vince2.png');
			this.game.load.image('pipe', '/images/experiments/vince2.png');

			this.game.physics.arcade.gravity.y = 1000;
			this.game.load.script('filter', '/lib/phaser/filters/LightBeam.js');

		},
		create: function() {
			this.game.state.start('main');
		}
	};

	var main_state = {

		create: function() {

			this.bird = this.game.add.sprite(100, 245, 'bird');
			this.game.physics.enable( [ this.bird ], Phaser.Physics.ARCADE);

			var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.jump, this);
			this.game.input.onDown.add(this.jump, this);

			this.pipes = this.game.add.group();
			this.pipes.createMultiple(40, 'pipe');
			this.game.physics.enable( this.pipes.children, Phaser.Physics.ARCADE);

			this.timer = this.game.time.events.loop(1500, this.add_pipes, this);
			this.score = 0;
			this.label_score = this.game.add.text(20, 20, "0", score_style);

			this.background = this.add.sprite(0, 0);
			this.background.width = this.game.width;
			this.background.height = this.game.height;

			this.filter = this.add.filter('LightBeam', this.game.width, this.game.height );

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
			this.game.time.events.remove(this.timer);
			this.game.state.start('main');
		},

		add_pipe: function(x, y) {

			var pipe = this.pipes.getFirstDead();
			pipe.checkWorldBounds = true;
			pipe.outOfBoundsKill = true;

			pipe.reset(x, y);
			pipe.body.allowGravity = false;
			pipe.body.velocity.x = -200;

			pipe.events.onOutOfBounds.add(function(){
//		console.log('yay');
			})

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
		},
	};

	window.PHASER.state.add('boot', boot_state);
	window.PHASER.state.add('main', main_state);

	window.addEventListener('message', messageIn, false);
	messageOut({state:'ready'});

}

var messageOut = function(data){
	var message = JSON.stringify(data);
	parent.postMessage(message, window.location.origin);
}

var messageIn = function(ev) {
	if(ev.origin === window.location.origin) {
		var message = JSON.parse(ev.data);
		if(message.action === 'start') {
			window.PHASER.state.start('boot');
			messageOut({action: 'started'});
		} else {
			console.log("Unknown message: "+ev.data);
		}
	}
}

document.addEventListener( "DOMContentLoaded", load, false );


