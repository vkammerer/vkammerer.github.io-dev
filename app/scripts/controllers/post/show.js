'use strict';

angular.module('wwwApp')
	.controller('PostShowCtrl', [
		'Post',
		'$scope',
		'$rootScope',
		'$filter',
		'$routeParams',
		function (
			Post,
			$scope,
			$rootScope,
			$filter,
			$routeParams
		){

			var postId = $routeParams.postId || "";

			if (!$rootScope.posts) {
				Post.then(function(posts){
					$scope.post = $filter('getById')(posts, postId);
				})
			}
			else {
				$scope.post = $filter('getById')($rootScope.posts, postId);
			}

	}]);
