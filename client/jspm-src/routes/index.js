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
  .controller('DoctorListCtrl', ['$mdDialog', '$mdToast', '$http', 'doctorsService',
                                  function($mdDialog, $mdToast, $http, doctorsService) {
    this.doctors = [{firstName: 'test'}, {firstName: 'test2'}];
    $http.get('/api/doctors')
      .then((response) =>{
        this.doctors.push(...response.data);
        console.log(response.data)
      })
      .catch(function (rejection) {
        console.error(rejection);
        $mdToast.showSimple('היתה בעיה בטעינת האינדקס');
      });

    this.addDoctor = (event) => {
      doctorsService.addOrEditDoctor(event).then((doctor) => {
        this.doctors.push(doctor);
      });
    };


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
      doctorDetails.name = {first: doctorDetails.firstName, last: doctorDetails.lastName, title: doctorDetails.title};
      doctorDetails.imgUrl = 'images/ariela.jpg';
      Reflect.defineProperty(doctorDetails.name, 'full', {
        get: function () { return `${this.title} ${this.first} ${this.last}`; }
      });

    this.details = doctorDetails;
  }]);
