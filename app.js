var converter = new Showdown.converter();
var parser = new DOMParser();
var div;

var app = angular.module('plunker', []);

app.controller('MainCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.name = 'World';
  $scope.title = [];
  $scope.links = [];
  $scope.content = [];
  
  $http.get("http://www.reddit.com/r/kboy101222/.json")
    .success(function(data, status, headers, config){
      //$scope.name = data;
      
      $scope.content = [];
      angular.forEach(data.data.children, function(i){
        $scope.title.push(i.data.title);
        $scope.content.push(i.data.selftext);
        $scope.links.push(i.data.url);
      }, $scope.title);
    })
    .error(function(data, status, headers, config){
      alert('ERROR');
    });
}]);

app.filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		  var html = converter.makeHtml(value || '');
      return $sce.trustAsHtml(html);
    };
});
