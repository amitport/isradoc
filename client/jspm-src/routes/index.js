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
  .controller('DoctorListCtrl', ['$mdDialog', function($mdDialog) {
    this.openDialog = function (event) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'routes/tabDialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    }
  }])
  .controller('DoctorDetailCtrl', ['$routeParams', 'doctorDetails',
      function($routeParams, doctorDetails) {
    this.id = $routeParams.doctorId;

      Reflect.defineProperty(doctorDetails.name, 'full', {
        get: function () { return `${this.title} ${this.first} ${this.last}`; }
      });

    this.details = doctorDetails;
  }]);
