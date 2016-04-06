angular
  .module('angularjs-demo', [
    'ngRoute',
    'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts', {
        templateUrl: 'posts.html',
        controller: 'PostsCtrl'
      })
      .otherwise({
        redirectTo: '/posts'
      });
  })
  .factory('Posts', function ($resource) {

    var POSTS_URL = 'http://jsonplaceholder.typicode.com/posts/:id';

    return $resource(POSTS_URL, {},
      {get: {method: 'GET'}}
    );
  })
  .controller('PostsCtrl', function ($scope, $log, Posts) {

    function query(id) {
      return Posts.get({id: id},
      function (data) {
        return data;
      }, function (err) {
        $log.error(JSON.stringify(err));
      });
    }

    $scope.query = function (id) {
      $log.info("id = " + id);
      $scope.postsResponse = query(id);
    };
  });
