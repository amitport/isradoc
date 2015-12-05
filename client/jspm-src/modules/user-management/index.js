
import angular from 'angular';
import 'angular-material';
import 'satellizer'
import UserManagementUtils from './userManagementUtils';

angular.module('id-user-management', ['satellizer', 'ngMaterial'])
  .config(['$authProvider', function($authProvider) {
    $authProvider.google({
      url: '/api/auth/google',
      clientId: '981804266888-jnp1tjs5mpajj8pn43lp9eskj6nvq787.apps.googleusercontent.com'
    });
  }])
  .service('userManagementUtils', UserManagementUtils)
  .controller('UserMenuController', ['userManagementUtils', '$location', '$route',
              function (userManagementUtils, $location, $route) {
    this.isAuthenticated = userManagementUtils.isAuthenticated.bind(userManagementUtils);
    this.openAuthDialog = userManagementUtils.openAuthDialog.bind(userManagementUtils);

    this.gotoUserProfile = function () {
      $location.path(`/users/${userManagementUtils.user._id}`);
    };
    this.gotoUserPages = function () {
      $location.path(`/users/${userManagementUtils.user._id}/pages`);
    };

    this.logout = function () {
      userManagementUtils.logout();
      if ($route.current.requireAuth) {
        $location.path('/');
      }
    }
  }]);

