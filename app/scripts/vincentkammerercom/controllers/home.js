'use strict';

angular.module('vincentkammerercomApp')
	.controller('HomeCtrl', [
		'$rootScope',
		'$scope',
		function (
			$rootScope,
			$scope
		){

			$rootScope.breadcrumb = 'Home';

		}
	]);
