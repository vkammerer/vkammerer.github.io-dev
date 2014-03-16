'use strict';

angular.module('vincentkammerercomApp')
	.factory('constants', function () {

		var toReturn = {};

		toReturn.snapOpts = {
			transitionSpeed: 0.3
		};

		toReturn.MIN_TIME_DISPLAY_SPINNER = 200;
		toReturn.DESKTOP_MIN_WIDTH = 768;

		return toReturn;

	});
