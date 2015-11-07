import angular from 'angular';

angular.module('id-routes', [])
  .controller('DoctorListCtrl', function() {})
  .controller('DoctorDetailCtrl', ['$routeParams', 'doctorDetails',
      function($routeParams, doctorDetails) {
    this.id = $routeParams.doctorId;
    this.details = doctorDetails;
  }]);
