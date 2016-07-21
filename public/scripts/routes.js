angular.module('campgrounds')
.config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
        templateUrl: '/templates/campgrounds.html',
        controller: 'CampgroundController'
    }).when('/new', {
        templateUrl:'/templates/new.html'
    }).when('/login',{
        templateUrl:'templates/login.html'
    }).when('/campgrounds/:authorid', {
        templateUrl: '/templates/posts.html',
        controller: 'PostController'
    }).otherwise({redirectTo: '/'})
    
    //$locationProvider.html5Mode(true);
})