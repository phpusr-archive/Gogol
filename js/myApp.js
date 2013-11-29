'use strict';

/* App Module */

var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
        .when('/bio', {templateUrl: 'partials/bio.html', controller: 'BioCtrl'})
        .when('/photo', {templateUrl: 'partials/photo.html', controller: 'PhotoCtrl'})
        .when('/artworks', {templateUrl: 'partials/artworks.html', controller: 'ArtworksCtrl'})
        .when('/artworks/:artworkId', {templateUrl: 'partials/artwork-read.html', controller: 'ArtworkReadCtrl'})
        .otherwise({redirectTo: '/main'});
}]);
/** Выполнение функции при выводе всех элементов ng-repeat */
app.directive('ngRepeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.ngRepeatDone);
        }
    }
});
