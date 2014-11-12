var portfolio = angular.module('portfolio', ['ngRoute','ngResource', 'ui.bootstrap']);

portfolio.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/static/js/views/home.html',
            controller: homeController
        }).
        when('/users/:userId', {
            templateUrl: '/static/js/views/user.html',
            controller: userController
        }).
        when('/projects/:projectId', {
            templateUrl: '/static/js/views/project.html',
            controller: projectController
        }).
        when('/register', {
          templateUrl: '/static/js/views/auth.html',
          controller: authController
        }).
        otherwise({redirectTo:'/'});
}]);