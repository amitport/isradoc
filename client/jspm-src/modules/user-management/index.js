
import angular from 'angular';
import 'satellizer'

angular.module('id-user-management', ['satellizer'])
  .config(['$authProvider', function($authProvider) {
    $authProvider.google({
      url: '/auth/google',
      clientId: '934313472226-n8fijjdof182odebbea8kk7htn2nlt91.apps.googleusercontent.com'
    });
  }])
  .run(['$rootScope', '$auth' , function($rootScope, $auth) {
    $rootScope.authenticate = function() {
      $auth.authenticate('google');
    };
  }]);
