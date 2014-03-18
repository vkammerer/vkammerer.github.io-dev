'use strict';

angular.module('utilsApp', []);
angular.module('experimentsApp', []);
angular.module('wordpressApp', []);

angular.module('vincentkammerercomApp', [
	'ngSanitize',
	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'ngAnimate',
	'utilsApp',
	'experimentsApp',
	'wordpressApp'
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
				templateUrl: 'views/vincentkammerercom/home.html',
				controller: 'HomeCtrl'
			})
			.when('/experiments', {
				templateUrl: 'views/vincentkammerercom/experiments.html',
				controller: 'ExperimentsCtrl'
			})
			.when('/blog', {
				templateUrl: 'views/vincentkammerercom/post/all.html',
				controller: 'PostListCtrl'
			})
			.when('/posts/:postSlug', {
				templateUrl: 'views/vincentkammerercom/post/show.html',
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
	'wpPost',
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

		var isMobile = function(){
			return $window.innerWidth < $rootScope.constants.DESKTOP_MIN_WIDTH;
		};
		var reloadOnIsMobile = function(){
			var isLastMobile = isMobile();
			if ($rootScope.isMobile !== isLastMobile) {
				$rootScope.isMobile = isLastMobile;
				$rootScope.$digest();
			}
		};
		$rootScope.isMobile = isMobile();
		$window.onresize = reloadOnIsMobile;





	}
]);
