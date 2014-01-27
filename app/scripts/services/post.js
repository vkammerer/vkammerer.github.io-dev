'use strict';

angular.module('wwwApp')
	.factory('Post', [
		'$resource',
		'$q',
		'constants',
		function(
			$resource,
			$q,
			constants
		){

			var postUrl = constants.API_URL + '/posts/:postId?callback=JSON_CALLBACK';
			var postFactory = $resource(
				postUrl,
				{postId:'@id'},
				{query: {method:'JSONP', params:{postId:'@id'}}}
			);

			var thisDefer = $q.defer();

			postFactory.query(function(data){
				for (var i in data.posts) {
					data.posts[i]._id = data.posts[i].ID.toString()
				}
				thisDefer.resolve(data.posts)
			});

			return thisDefer.promise;
		}
	]);
