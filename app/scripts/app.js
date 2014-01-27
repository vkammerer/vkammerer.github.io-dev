'use strict';

angular.module('wwwApp', [
	'ngCookies',
	'ngSanitize',
	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'ngAnimate'
])
.config([
	'$routeProvider',
	'$httpProvider',
	function(
		$routeProvider,
		$httpProvider
	){

//		$httpProvider.interceptors.push('ClientSpeedInterceptor');

		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			})
			.when('/posts', {
				templateUrl: 'views/post/all.html',
				controller: 'PostListCtrl'
			})
			.when('/posts/:postId', {
				templateUrl: 'views/post/show.html',
				controller: 'PostShowCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
.run([
	'$rootScope',
	'constants',
	'Post',
	function(
		$rootScope,
		constants,
		Post
	){

		if (!$rootScope.posts) {
			Post.then(function(posts){
				$rootScope.posts = posts;
			})
		}
		$rootScope.constants = constants;

	}
]);
