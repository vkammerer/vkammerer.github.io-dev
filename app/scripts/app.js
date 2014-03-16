'use strict';

angular.module('vincentkammerercomApp', [
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
			.when('/experiments', {
				templateUrl: 'views/experiments/all.html',
				controller: 'ExperimentsCtrl'
			})
			.when('/blog', {
				templateUrl: 'views/post/all.html',
				controller: 'PostListCtrl'
			})
			.when('/posts/:postSlug', {
				templateUrl: 'views/post/show.html',
				controller: 'PostShowCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
])
.run([
	'$rootScope',
	'$window',
	'constants',
	'Post',
	function(
		$rootScope,
		$window,
		constants,
		Post
	){

		$window.VK = {};

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.navshown = false;
		});

		$rootScope.constants = constants;
		$rootScope.breadcrumb = '';

	}
]);
