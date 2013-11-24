'use strict';

/* App Module */

var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/index', {templateUrl: 'partials/index.html', controller: 'TestCtrl'})
        .when('/bio', {templateUrl: 'partials/test.html', controller: 'TestCtrl'})
        .when('/photo', {templateUrl: 'partials/test.html', controller: 'TestCtrl'})
        .when('/artworks', {templateUrl: 'partials/test.html', controller: 'TestCtrl'})
        .otherwise({redirectTo: '/index'});
}]);

app.controller('MainCtrl', function MainCtrl($rootScope, $scope, $location) {

    $scope.nav = [
        {name: 'Главная', link: '#index', path: '/index'},
        {name: 'Биография', link: '#bio', path: '/bio'},
        {name: 'Фотогалерея', link: '#photo', path: '/photo'},
        {name: 'Произведения', link: '#artworks', path: '/artworks'}
    ];

    //Смена страницы
    $rootScope.changeActiveNav = function() {
        var path = $location.$$path;

        for(var i=0; i<$scope.nav.length; i++) {
            var n = $scope.nav[i];
            n.cl = n.path == path;
        }
    };

});

app.controller('TestCtrl', function MyCtrl($rootScope, $scope, $location) {
    $rootScope.changeActiveNav();
});
