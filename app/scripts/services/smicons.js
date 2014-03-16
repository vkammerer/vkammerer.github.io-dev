'use strict';

angular.module('vincentkammerercomApp')
	.factory('smicons', [function($resource) {
		var icons = [
			{
				name : 'github',
				href: 'https://github.com/vkammerer'
			},
			{
				name : 'linkedin',
				href: 'http://www.linkedin.com/in/kammerer'
			},
			{
				name : 'twitter',
				href: 'https://twitter.com/kammerer'
			},
			{
				name : 'google-plus',
				href: 'https://plus.google.com/u/0/+VincentKammerer'
			}
		];
		return icons;
	}]);
