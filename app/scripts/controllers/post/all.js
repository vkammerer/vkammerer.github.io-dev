'use strict';

angular.module('vincentkammerercomApp')
	.controller('PostListCtrl', [
		'Post',
		'$scope',
		'$rootScope',
		function (
			Post,
			$scope,
			$rootScope
		){
			$rootScope.breadcrumb = 'Blog';
	}]);
