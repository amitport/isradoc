import './main.css!';

import angular from 'angular';

// load angular modules
import 'angular-material';
import 'angular-route';
import './routes/index';

import './modules/user-management/index';
import './modules/recommendations/index';
import './modules/doctors/index';

angular.module('isradoc', ['ngMaterial', 'ngRoute', 'id-routes', 'id-user-management', 'id-recommendations',
  'id-doctors'])
.config(['$locationProvider', '$routeProvider', '$mdThemingProvider',
    function($locationProvider, $routeProvider, $mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('brown')
        //.warnPalette('deep-orange')
      //.backgroundPalette('brown')
      ;


  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider
    .when('/doctors', {
      templateUrl: 'partials/doctor-list.html'
    })
    .when('/', {redirectTo: '/doctors'})
    .when('/doctors/:doctorId', {
      templateUrl: 'partials/doctor-detail.html',
      controllerAs: 'doctor',
      controller: 'DoctorDetailCtrl',
      resolve: {
        //doctorDetails: ['$http', '$route', function($http, $route) {
        //  return $http
        //    .get(`data/doctors/${$route.current.params.doctorId}.json`)
        //    .then((response) =>
        //      //new Promise(function(resolve){setTimeout(resolve,3000)}));
        //      response.data);
        //}],
        doctorDetails: ['$http', '$route', function($http, $route) {
          return $http
            .get(`api/doctors/${$route.current.params.doctorId}`)
            .then((response) => {
              //console.log(response.data);

              return response.data;
            });
        }]
      }
    })
    .when('/users/:userId', {
      templateUrl: 'partials/user-detail.html',
      requireAuth: true,
      controller: ['$scope', 'userManagementUtils', function ($scope, userManagementUtils) {
        $scope.auth = userManagementUtils;
      }]
    })
    .when('/users/:userId/pages', {
      templateUrl: 'partials/user-pages.html',
      requireAuth: true,
      controller: ['$scope', 'userManagementUtils', function ($scope, userManagementUtils) {
        $scope.auth = userManagementUtils;
      }]
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
.run(['$rootScope', '$location', '$timeout', 'userManagementUtils',
    function ($rootScope, $location, $timeout, userManagementUtils){
  let isViewLoading = false;
  $rootScope.isViewLoadingSlow = false;
  $rootScope.$on('$routeChangeStart', function(e, nextRoute) {
    if (nextRoute.$$route.requireAuth && !userManagementUtils.isAuthenticated()) {
      $location.path(`/errors/unauthenticated`).replace();
    } else {
      isViewLoading = true;
      $timeout(function () {
        if (isViewLoading) {
          $rootScope.isViewLoadingSlow = true;
        }
      }, 500);
    }
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.isViewLoadingSlow = isViewLoading = false;
  });
  $rootScope.$on('$routeChangeError', function (event, currentRoute, previousRoute, rejection) {
    $location.path(`/errors/${rejection.status}`).replace();
    $rootScope.isViewLoadingSlow = isViewLoading = false;
  });
}]);


angular.element(document).ready(function () {
  angular.bootstrap(document, ['isradoc'], {strictDi: true});
});
