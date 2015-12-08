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
  .controller('DoctorDetailCtrl', ['$routeParams', 'doctorDetails',
      function($routeParams, doctorDetails) {
    this.id = $routeParams.doctorId;
      doctorDetails.name = {first: doctorDetails.firstName, last: doctorDetails.lastName, title: doctorDetails.title};
      doctorDetails.imgUrl = 'http://placehold.it/150x150';//'images/ariela.jpg';
      Reflect.defineProperty(doctorDetails.name, 'full', {
        get: function () { return `${this.title} ${this.first} ${this.last}`; }
      });

    this.details = doctorDetails;
  }]);
