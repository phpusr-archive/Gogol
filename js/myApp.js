'use strict';

/* App Module */

var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/index', {templateUrl: 'partials/index.html', controller: 'MyCtrl'})
        .when('/test', {templateUrl: 'partials/test.html', controller: 'MyCtrl'})
        .otherwise({redirectTo: '/index'});
}]);

app.controller('MyCtrl', function MyCtrl($scope, $location) {
    console.log($location.$$path); //TODO узнавание ссылки
    $scope.location = 'index';
});

app.controller('TestCtrl', function MyCtrl($scope, $location) {
    console.log($location.$$path); //TODO узнавание ссылки
    $scope.location = 'test';
});
