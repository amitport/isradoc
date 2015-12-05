export default class UserManagementUtils {
  constructor($log, $mdDialog, $mdToast, $auth, $http) {
    this.$log = $log;
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$auth = $auth;

    if ($auth.isAuthenticated()) {
      $http.get('api/users/me')
        .then(({data}) => {
          this.user = {
            _id: data._id,
            displayName: data.displayName,
            avatarImageUrl: data.avatarImageUrl
          };
        })
        .catch(({data}) => {
          $log.error(data);
          $auth.logout();
        });
    }
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  logout() {
    this.$auth.logout();
    delete this.user;
    this.$mdToast.showSimple('יצאת בהצלחה');
  }

  authenticate() {
    return this.$auth.authenticate('google')
      .then(({data}) => {
        this.user = {
          _id: data._id,
          displayName: data.displayName,
          avatarImageUrl: data.avatarImageUrl
        };
        this.$mdToast.showSimple('התחברת בהצלחה');
      })
      .catch((rejection) => {
        this.$log.error(rejection);
        this.$mdToast.showSimple('היתה בעיה בתהליך ההתחברות');
        return Promise.reject();
      });
  }

  openAuthDialog(targetEvent) {
    return this.$mdDialog.show(
      {
        targetEvent: targetEvent,
        clickOutsideToClose: true,
        templateUrl: 'partials/user-management/authProviderDialog.html',
        controller: ['$scope', '$mdDialog', ($scope, $mdDialog) => {
          $scope.ctrl = {
            authenticate: () => this.authenticate()
                .then(() => {$mdDialog.hide();})
                .catch(() => {$mdDialog.cancel(); return Promise.reject()})
          };
        }]
      });
  }

  interactiveEnsureAuth(targetEvent, afterAuthCb) {
    return this.$auth.isAuthenticated() ?
              afterAuthCb(this.user) :
              this.openAuthDialog(targetEvent)
                .then(() => afterAuthCb(this.user));
  }
}

UserManagementUtils.$inject = [
  '$log', '$mdDialog', '$mdToast', '$auth', '$http'];
