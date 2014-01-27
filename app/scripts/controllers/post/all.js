'use strict';

angular.module('wwwApp')
	.controller('PostListCtrl', [
		'Post',
		'$scope',
		'$rootScope',
		function (
			Post,
			$scope,
			$rootScope
		){

			if (!$rootScope.posts) {
				Post.then(function(posts){
					$rootScope.posts = posts;
				})
			}

	}]);
