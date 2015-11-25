import './main.css!';

import angular from 'angular';

// load angular modules
import 'angular-material';
import 'angular-route';
import './routes/index';

import './modules/user-management/index';
import './modules/recommendations/index';

angular.module('isradoc', ['ngMaterial', 'ngRoute', 'id-routes', 'id-user-management', 'id-recommendations'])
.config(['$locationProvider', '$routeProvider', '$mdThemingProvider',
    function($locationProvider, $routeProvider, $mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('brown')
      //.warnPalette('brown')
      //.backgroundPalette('cyan')
      ;


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
            .then((response) =>
            //  new Promise(function(resolve){setTimeout(resolve,3000)}));
              response.data);
        }]
      }
    })
    .when('/users/:userId', {
      templateUrl: 'partials/user-detail.html'
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
.run(['$rootScope', '$location', '$timeout', '$mdToast', '$mdDialog', function ($rootScope, $location, $timeout, $mdToast, $mdDialog){
  let isViewLoading = false;
  $rootScope.isViewLoadingSlow = false;
  $rootScope.$on('$routeChangeStart', function() {
    isViewLoading = true;
    $timeout(function () {
      if (isViewLoading) {
        $rootScope.isViewLoadingSlow = true;
      }
    }, 500);
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.isViewLoadingSlow = isViewLoading = false;
  });
  $rootScope.$on('$routeChangeError', function (event, currentRoute, previousRoute, rejection) {
    $location.path(`/errors/${rejection.status}`).replace();
    $rootScope.isViewLoadingSlow = isViewLoading = false;
  });

  $rootScope.unlock = (event) => {
    const dialogPromise = $mdDialog.show(
      {
      targetEvent: event,
      clickOutsideToClose: true,
      template: `
<md-dialog>
  <md-dialog-content class="md-dialog-content">
    <div class="md-dialog-content-body">
      <p>הרשם!</p>
    </div>
  </md-dialog-content>
  <md-dialog-actions>
    <md-button ng-click="closeDialog()">סגור</md-button>
  </md-dialog-actions>
</md-dialog>`,
      controller: ['$scope', '$mdDialog', 'employee',function GreetingController($scope, $mdDialog, employee) {
        // Assigned from construction <code>locals</code> options...
        $scope.employee = employee;
        $scope.closeDialog = function() {
          // Easily hides most recent dialog shown...
          // no specific instance reference is needed.
          $mdDialog.hide('userId');
        };
      }],
      locals: { employee: 'userName' }
    });
    dialogPromise.then((userId) =>
      $mdToast.showSimple('זהותך אומתה בהצלחה! '+ userId)
    , (rejection) =>
      $mdToast.showSimple('כשלון! ' + rejection)
    )
  }
}]);


angular.element(document).ready(function () {
  angular.bootstrap(document, ['isradoc'], {strictDi: true});
});
