import angular from 'angular';

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
DialogController.$inject = ['$scope', '$mdDialog'];

angular.module('id-routes', [])
  .controller('DoctorListCtrl', ['$mdDialog', '$mdToast', '$http', function($mdDialog, $mdToast, $http) {
    this.doctors = [{firstName: 'test'}, {firstName: 'test2'}];
    $http.get('/api/doctors').then(function (response) {
      console.log(response.data)
    }, function (rejection) {
      console.error(rejection);
      $mdToast.showSimple('היתה בעיה בטעינת האינדקס');
    });
    this.openSearchDialog = function (event) {
      $mdDialog.show({
          template: `
<md-dialog>
  <md-dialog-content class="md-dialog-content">
    <div class="md-dialog-content-body" layout layout-padding>
      <p style="font-style: italic;">האתר עדיין לא תומך בחיפוש, בבקשה בדקו מאוחר יותר</p>
    </div>
  </md-dialog-content>
</md-dialog>`,
          targetEvent: event,
          clickOutsideToClose:true
        });
    };
  }])
  .controller('DoctorDetailCtrl', ['$routeParams', 'doctorDetails',
      function($routeParams, doctorDetails) {
    this.id = $routeParams.doctorId;

      Reflect.defineProperty(doctorDetails.name, 'full', {
        get: function () { return `${this.title} ${this.first} ${this.last}`; }
      });

    this.details = doctorDetails;
  }]);
