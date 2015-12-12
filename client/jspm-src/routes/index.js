import angular from 'angular';

import 'angular-file-upload';
import 'ngImgCrop';
import 'ngImgCrop/compile/minified/ng-img-crop.css!';

angular.module('id-routes', ['ngFileUpload', 'ngImgCrop'])
  .controller('DoctorDetailCtrl', ['$routeParams', 'doctorDetails', 'doctorsService',
    '$mdDialog', '$mdToast',
    function ($routeParams, doctorDetails, doctorsService, $mdDialog, $mdToast) {
      this.id = $routeParams.doctorId;
      doctorDetails.name = {first: doctorDetails.firstName, last: doctorDetails.lastName, title: doctorDetails.title};
      if (doctorDetails.hasOwnProperty('mainImg')) {
        doctorDetails.imgUrl = `data:${doctorDetails.mainImg.mimetype};base64,${doctorDetails.mainImg.data}`
      } else {
        doctorDetails.imgUrl = 'http://placehold.it/150x150';
      }

      Reflect.defineProperty(doctorDetails.name, 'full', {
        get: function () {
          return `${this.title} ${this.first} ${this.last}`;
        }
      });

      this.details = doctorDetails;

      this.edit = function (event) {
        doctorsService.addOrEditDoctor(event, this.details);
      };

      this.openImgSelectDialog = function (event) {
        $mdDialog.show(
          {
            focusOnOpen: false,
            targetEvent: event,
            clickOutsideToClose: true,
            templateUrl: 'partials/doctors/imgSelectDialog.html',
            controllerAs: 'ctrl',
            bindToController: true,
            controller: ['$mdDialog', 'Upload', '$scope', '$timeout',
              function ($mdDialog, Upload, $scope, $timeout) {
                //this.save = () => {
                //  $mdDialog.hide();
                //}

                $scope.upload = function (dataUrl) {
                  Upload.upload({
                    url: `/api/doctors/${$routeParams.doctorId}/actions/uploadMainImg`,
                    data: {
                      file: Upload.dataUrltoBlob(dataUrl)
                    }
                  }).then(function ({data}) {
                    $timeout(function () {
                      doctorDetails.mainImg = data.mainImg;
                      doctorDetails.imgUrl = `data:${doctorDetails.mainImg.mimetype};base64,${doctorDetails.mainImg.data}`;

                      $mdDialog.hide();
                    });
                  }, function (response) {
                    if (response.status > 0) $scope.errorMsg = response.status
                      + ': ' + response.data;
                     $mdToast.showSimple('היתה בעיה בהעלאת התמונה, בבקשה נסה שוב מאוחר יותר');
                     $mdDialog.cancel();
                  }, function (evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                  });
                }
              }]
          })
      }
    }]);
