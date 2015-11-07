import angular from 'angular';

// load angular modules
import 'angular-material';
import 'angular-route';
import './routes/index';

angular.module('isradoc', ['ngMaterial', 'ngRoute', 'id-routes'])
.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider
    .when('/doctors', {
      templateUrl: 'partials/doctor-list.html',
      controller: 'DoctorListCtrl'
    })
    .when('/', {redirectTo: '/doctors'})
    .when('/doctors/:doctorId', {
      templateUrl: 'partials/doctor-detail.html',
      controllerAs: 'doctor',
      controller: 'DoctorDetailCtrl',
      resolve: {
        doctorDetails: ['$http', '$route', function($http, $route) {
          return $http
            .get(`data/doctors/${$route.current.params.doctorId}.json`)
            .then((response) => response.data);
        }]
      }
    })
    .when('/errors/:status', {
      templateUrl: 'partials/error-detail.html',
      controllerAs: 'error',
      controller: ['$routeParams', function ($routeParams) {
        this.status = $routeParams.status;
      }]
    })
    .otherwise({
      redirectTo: '/errors/404'
    });
}])
.run(['$rootScope', '$location', function ($rootScope, $location){
  $rootScope.$on('$routeChangeError', function (event, currentRoute, previousRoute, rejection) {
    $location.path(`/errors/${rejection.status}`).replace();
  });
}])
;


angular.element(document).ready(function () {
  angular.bootstrap(document, ['isradoc'], {strictDi: true});
});
