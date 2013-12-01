'use strict';

/* App Module */

var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
        .when('/bio', {templateUrl: 'partials/bio.html', controller: 'BioCtrl'})
        .when('/photo', {templateUrl: 'partials/photos.html', controller: 'PhotoCtrl'})
        .when('/video', {templateUrl: 'partials/videos.html', controller: 'VideoCtrl'})
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

/** Перемешивание массива */
Array.prototype.shuffle = function( b ) {
    var i = this.length, j, t;
    while( i ) {
        j = Math.floor( ( i-- ) * Math.random() );
        t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }

    return this;
};
