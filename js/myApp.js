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
/** Включение Фоторамы при загрузке всех изображений */
app.directive('ngImgOnload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                $(".fotorama").fotorama();
            });
        }
    };
});

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

    $http.get('data/artworks.json').success(function(data) {
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

    $http.get('data/artworks.json').success(function(data) {
        $scope.data = data;
    });
});

/** Read Artwork Page */
app.controller('ArtworkReadCtrl', function ArtworkReadCtrl($rootScope, $scope, $http, $routeParams) {
    $rootScope.changeActiveNav();

    var artworkId = $routeParams.artworkId;
    $scope.data = {id: 'load'}; //TODO можно попробовать сделать анимир-ю
    $http.get('data/artworks/' + artworkId + '/data.json').success(function(data) {
        $scope.data = data;
    });
});

/** Photo Page **/
app.controller('PhotoCtrl', function PhotoCtrl($rootScope, $scope) {
    $rootScope.changeActiveNav();

    //Конфигурация Фоторамы
    $scope.options  = {
        width: '100%',
        height: 400,
        loop: true,
        keyboard: true,
        nav: 'thumbs'
    };

    $scope.items = [{img: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', thumb: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg'}
        ,{img: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', thumb: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg'}
        ,{img: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', thumb: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg'}
    ];
});

app.controller('TestCtrl', function TestCtrl($rootScope, $scope) {
    $rootScope.changeActiveNav();
});
