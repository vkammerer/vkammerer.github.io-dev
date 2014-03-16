'use strict';

angular.module('vincentkammerercomApp')
	.controller('PostListCtrl', [
		'wpPost',
		'$scope',
		'$rootScope',
		function (
			Post,
			$scope,
			$rootScope
		){
			$rootScope.breadcrumb = 'Blog';
	}]);
