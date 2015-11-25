
import angular from 'angular';
import 'angular-material';
import 'satellizer'

angular.module('id-user-management', ['satellizer', 'ngMaterial'])
  .config(['$authProvider', function($authProvider) {
    $authProvider.google({
      url: '/api/auth/google',
      clientId: '934313472226-n8fijjdof182odebbea8kk7htn2nlt91.apps.googleusercontent.com'
    });
  }])
  .run(['$rootScope', '$auth', '$mdToast', '$http', function($rootScope, $auth, $mdToast, $http) {
    $rootScope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $rootScope.logout = function() {
      $auth.logout();
      delete $rootScope.user;
      $mdToast.showSimple('יצאת בהצלחה')
    };
    $rootScope.authenticate = function() {
      return $auth.authenticate('google').then(
        ({data}) => {
          $rootScope.user = {
            _id: data._id,
            displayName: data.displayName,
            avatarImageUrl: data.avatarImageUrl
          };
          $mdToast.showSimple('התחברת בהצלחה')
        },
        (rejection) => $mdToast.showSimple('היתה בעיה בתהליך ההתחברות')

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
  .controller('UserMenuController', ['$location', function ($location) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.gotoProfile = function (userId) {
      $location.path(`/users/${userId}`);
    }
  }]);
