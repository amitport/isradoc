
import angular from 'angular';
import 'angular-material';
import 'satellizer'

angular.module('id-user-management', ['satellizer', 'ngMaterial'])
  .config(['$authProvider', function($authProvider) {
    $authProvider.google({
      url: '/api/auth/google',
      clientId: '981804266888-jnp1tjs5mpajj8pn43lp9eskj6nvq787.apps.googleusercontent.com'
    });
  }])
  .run(['$rootScope', '$auth', '$mdToast', '$mdDialog', '$http', function($rootScope, $auth,
                                                                          $mdToast, $mdDialog,
                                                                                    $http) {
    $rootScope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $rootScope.logout = function() {
      $auth.logout();
      delete $rootScope.user;
      $mdToast.showSimple('יצאת בהצלחה');
    };
    $rootScope.openAuthProviderSelectionDialog = function (event) {
      return $mdDialog.show(
        {
          targetEvent: event,
          clickOutsideToClose: true,
          templateUrl: 'partials/user-management/authProviderDialog.html',
          controller: ['$scope', '$rootScope', '$mdDialog', function ($scope, $rootScope, $mdDialog) {
            $scope.authenticate = function () {
              $rootScope.authenticate().then(function () {
                $mdDialog.hide();
              }, function () {
                $mdDialog.cancel();
              });
            };
          }]
        })
    };
    $rootScope.authenticate = function() {
      return $auth.authenticate('google').then(
        ({data}) => {
          $rootScope.user = {
            _id: data._id,
            displayName: data.displayName,
            avatarImageUrl: data.avatarImageUrl
          };
          $mdToast.showSimple('התחברת בהצלחה');
        },
        (rejection) => {
          console.error(rejection);
          $mdToast.showSimple('היתה בעיה בתהליך ההתחברות');
          return Promise.reject();
        }

      )
    };

    if ($auth.isAuthenticated()) {
      $http.get('api/users/me').then(function ({data}) {
        $rootScope.user = {
          _id: data._id,
          displayName: data.displayName,
          avatarImageUrl: data.avatarImageUrl
        };
      }, function ({data}) {
        console.error(data);
        $auth.logout();
      });
    }
  }])
  .controller('UserMenuController', ['$rootScope', '$location', '$route', function ($rootScope, $location, $route) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.gotoUserProfile = function (userId) {
      $location.path(`/users/${userId}`);
    };
    this.gotoUserPages = function (userId) {
      $location.path(`/users/${userId}/pages`);
    };

    this.logout = function () {
      $rootScope.logout();
      if ($route.current.requireAuth) {
        $location.path('/');
      }
    }
  }]);
