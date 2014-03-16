'use strict';

angular.module('wordpressApp')
	.factory('wpConstants', function () {

		var toReturn = {};

		toReturn.API_URL = 'http://public-api.wordpress.com/rest/v1/sites/vincentkammerercom.wordpress.com';

		return toReturn;

	});
