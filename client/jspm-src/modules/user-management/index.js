
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
  .run(['$rootScope', '$auth', '$mdToast', '$mdDialog', '$http', function($rootScope, $auth, $mdToast, $mdDialog, $http) {
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
          template: `
<md-dialog>
  <md-dialog-content class="md-dialog-content">
    <div class="md-dialog-content-body" layout="column">
        <md-button ng-click="authenticate()" class="md-raised">
          <span layout="row" layout-align="start center">
            <img src="images/Google_-G-_Logo.svg" width="18" height="18">
            <span flex style="margin:0 24px; text-align: start;">
            אמת זהות
          באמצעות גוגל</span>
          </span>
        </md-button>
        <md-button ng-disabled="true" class="md-raised">
          <span layout="row" layout-align="start center">
            <img src="images/Facebook_-F-_Logo.svg" width="18" height="18">
            <span flex style="margin:0 24px; text-align: start;">
            אמת זהות
          באמצעות פייסבוק</span>
          <small class="md-caption">(לא נתמך)</small>
          </span>
        </md-button>
    </div>
  </md-dialog-content>
</md-dialog>`,
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
