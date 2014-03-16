'use strict';

angular.module('vincentkammerercomApp')
	.factory('constants', function () {

		var toReturn = {};

		toReturn.ROOT_URL = 'http://vkammerer.github.io';
		toReturn.API_URL = 'http://public-api.wordpress.com/rest/v1/sites/vincentkammerercom.wordpress.com';

		toReturn.snapOpts = {
			transitionSpeed: 0.3
		};

		toReturn.MIN_TIME_DISPLAY_SPINNER = 200;
		toReturn.DESKTOP_MIN_WIDTH = 768;

		return toReturn;

	});
