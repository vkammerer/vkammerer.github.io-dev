'use strict';

angular.module('vincentkammerercomApp')
	.controller('ExperimentsCtrl', [
		'$rootScope',
		'$scope',
		function (
			$rootScope,
			$scope
		){

			$rootScope.breadcrumb = 'Experiments';

			$scope.$on('$destroy', function(ev,name){
				$rootScope.background = '';
			});

		}
	]);
