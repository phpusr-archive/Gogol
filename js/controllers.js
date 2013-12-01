/** Template Page */
app.controller('IndexCtrl', function MainCtrl($rootScope, $scope, $location) {
    //Навигация
    $scope.nav = [
        {name: 'Главная', link: 'main'},
        {name: 'Биография', link: 'bio'},
        {name: 'Фотогалерея', link: 'photo'},
        {name: 'Произведения', link: 'artwork'}
    ];

    //Смена страницы
    $rootScope.changeActiveNav = function() {
        var path = $location.$$path;

        for(var i=0; i<$scope.nav.length; i++) {
            var n = $scope.nav[i];
            n.cl = path == ('/' + n.link);
        }
    };

});

/** Main Page */
app.controller('MainCtrl', function MainCtrl($rootScope, $scope, $http) {
    $rootScope.changeActiveNav();

    $http.get('data/artwork-list.json').success(function(data) {
        $scope.data = data.popular.shuffle().slice(0,3);
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

        $scope.activeId = pId;
    }
});

/** Artwork Page */
app.controller('ArtworkCtrl', function ArtworkCtrl($rootScope, $scope, $http, $timeout) {
    $rootScope.changeActiveNav();

    $http.get('data/artwork-list.json').success(function(data) {
        $scope.popular = data.popular.shuffle();
        $scope.other = data.other;
    });

    //Вывод в несколько столбцов
    $scope.autocolumnlist = function() {
        $timeout(function() {
            $(".autocolumnlist").autocolumnlist({columns: 2});
        }, 0);
    };
});

/** Artwork Read Page */
app.controller('ArtworkReadCtrl', function ArtworkReadCtrl($rootScope, $scope, $http, $routeParams) {
    $rootScope.changeActiveNav();

    var artworkId = $routeParams.artworkId;
    $scope.data = {id: artworkId};
    $http.get('data/artwork/' + artworkId + '/data.json').success(function(data) {
        $scope.data = data;
    });
});

/** Photo Page **/
app.controller('PhotoCtrl', function PhotoCtrl($rootScope, $scope, $http, $timeout) {
    $rootScope.changeActiveNav();

    //Конфигурация Фоторамы
    $scope.opt  = {
        width: 800,
        height: 400,
        loop: true,
        keyboard: true,
        nav: 'thumbs',
        fullScreen: true,
        autoPlay: 3000,
        shuffle: true
    };

    $http.get('data/photo-list.json').success(function(data) {
        $scope.items = data;
    });

    $scope.initFotorama = function() {
        $timeout(function() {
            $(".fotorama").fotorama();
        }, 0);
    };

});

/** Video Page */
app.controller('VideoCtrl', function VideoCtrl($rootScope, $scope, $http) {
    $rootScope.changeActiveNav();

    $http.get('data/video-list.json').success(function(data) {
        var path = '../data/video/';
        for (var i=0; i<data.length; i++) {
            data[i].file = path + data[i].file;
            data[i].poster = path + data[i].poster;
        }

        $scope.data = data;
    });
});

/** Test Page */
app.controller('TestCtrl', function TestCtrl($rootScope, $scope) {
    $rootScope.changeActiveNav();
});
