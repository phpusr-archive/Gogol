'use strict';

/* App Module */

var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
        .when('/bio', {templateUrl: 'partials/bio.html', controller: 'BioCtrl'})
        .when('/photo', {templateUrl: 'partials/test.html', controller: 'TestCtrl'})
        .when('/artworks', {templateUrl: 'partials/artworks.html', controller: 'ArtworksCtrl'})
        .when('/artworks/:artworkId', {templateUrl: 'partials/artwork-read.html', controller: 'ArtworkReadCtrl'})
        .otherwise({redirectTo: '/main'});
}]);

app.controller('IndexCtrl', function MainCtrl($rootScope, $scope, $location) {

    $scope.nav = [
        {name: 'Главная', link: '#main', path: '/main'},
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

/** Main Page */
app.controller('MainCtrl', function MainCtrl($rootScope, $scope, $http) {
    $rootScope.changeActiveNav();

    $http.get('data/main.json').success(function(data) {
        $scope.data = data;
    });
});

/** Bio Page */
app.controller('BioCtrl', function BioCtrl($rootScope, $scope, $http, $location, $anchorScroll) {
    $rootScope.changeActiveNav();

    $http.get('data/bio.json').success(function(data) {
        $scope.data = data;
    });

    $scope.scrollTo = function(pId) {
        var old = $location.hash();
        $location.hash(pId);
        $anchorScroll();
        $location.hash(old);
    }
});

/** Artworks Page */
app.controller('ArtworksCtrl', function ArtworksCtrl($rootScope, $scope, $http) {
    $rootScope.changeActiveNav();

    $scope.data = [];
    for (var i=1; i<=3; i++) {
        $http.get('data/artworks/artwork-' + i + '.json').success(function(data) {
            $scope.data.push(data);
        });
    }
});

/** Read Artwork Page */
app.controller('ArtworkReadCtrl', function ArtworkReadCtrl($rootScope, $scope, $routeParams) {
    $rootScope.changeActiveNav();

    $scope.artworkId = $routeParams.artworkId;
});

app.controller('TestCtrl', function TestCtrl($rootScope, $scope) {
    $rootScope.changeActiveNav();
});
