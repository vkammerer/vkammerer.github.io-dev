'use strict';

angular.module('vincentkammerercomApp')
	.controller('PostShowCtrl', [
		'wpPost',
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

			var postSlug = $routeParams.postSlug || "";

			Post.then(function(){
				if (postSlug) {
					$scope.post = $filter('filterByParamVal')($rootScope.posts, 'slug' , postSlug)[0];
					$rootScope.breadcrumb = $scope.post.title;
				}
			})

	}]);
