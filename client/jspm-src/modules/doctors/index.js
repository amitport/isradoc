import angular from 'angular';

import 'satellizer';
import 'angular-material';
import '../user-management/index';

class DoctorsService {
  constructor(userManagementUtils, $mdDialog, $mdToast, $http) {
    Object.assign(this, {userManagementUtils, $mdDialog, $mdToast, $http});
  }

  query(q) {
    return this.$http.get('/api/doctors', {params: {q}})
      .then((response) =>
        response.data.map((d) => {return {...d, fullName: `${d.title} ${d.firstName} ${d.lastName}`};})
      )
      .catch((rejection) => {
        console.error(rejection);
        this.$mdToast.showSimple('היתה בעיה בטעינת האינדקס');
      });
  }

  addOrEditDoctor(event, doctor) {
    const isNew = (doctor == null);
    if (isNew) {
      doctor = {title: '', firstName: 'ש', lastName: 'ב', mainPhone: '*1230'};
    }

    return this.userManagementUtils.interactiveEnsureAuth(event, () => {
      return this.$mdDialog.show(
        {
          focusOnOpen: false,
          targetEvent: event,
          clickOutsideToClose: true,
          templateUrl: 'partials/doctors/editDoctorDialog.html',
          controllerAs: 'ctrl',
          locals: {"doctor": doctor},
          bindToController: true,
          controller: ['$mdDialog', function ($mdDialog) {
            this.save = () => {
              if (!this.form.$invalid) {
                $mdDialog.hide();
              } else {
                this.form.$error['required'].forEach(function (field) {
                  field.$setTouched();
                });
              }
            }
          }]
        })
        .then(() => {
          if (isNew) {
            return this.$http.post('api/doctors', doctor)
              .then(({data}) => {
                this.$mdToast.showSimple('נשמר בהצלחה!');
                Object.assign(doctor, data);
                return doctor;
              })
              .catch((rejection) => {
                this.$mdToast.showSimple('היתה בעיה בשמירה, בבקשה נסה שוב מאוחר יותר');
                return Promise.reject(rejection);
              });
          } else return Promise.resolve(doctor); // TODO update db
        });
    })
  }

  delete(doctor) {
    return this.$http.delete(`/api/doctors/${doctor._id}`)
      .then(() => {
        this.$mdToast.showSimple('רשומה נמחקה');
      })
      .catch((rejection) => {
        console.error(rejection);
        this.$mdToast.showSimple('היתה בעיה, בבקשה נסה שוב מאוחר יותר');
        return Promise.reject();
      })
  }
}
DoctorsService.$inject = ['userManagementUtils', '$mdDialog', '$mdToast', '$http'];

angular.module('id-doctors', ['satellizer', 'ngMaterial', 'id-user-management'])
  .service('doctorsService', DoctorsService)
  .directive('doctorListToolbar', function () {
    return {
      templateUrl: 'partials/doctors/doctor-list-toolbar.html',
      scope: true,
      controllerAs: 'ctrl',
      controller: ['doctorsService', '$scope', '$mdDialog', function (doctorsService, $scope, $mdDialog) {
        this.addDoctor = (event) => {
          doctorsService.addOrEditDoctor(event).then((/*d*/) => {
            $scope.$broadcast('id-doctor-added');
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
      }]
    };
  })
  .directive('doctorList', function () {
    return {
      templateUrl: 'partials/doctor-list-content.html',
      scope: true,
      bindToController: {
        'query': '=',
        'header': '@'
      },
      controllerAs: 'ctrl',
      controller: ['doctorsService', '$scope', function (doctorsService, $scope) {
        const performQuery = () => {
          doctorsService.query(this.query).then((doctors) => {
            this.doctors = doctors;
          });
        };
        performQuery();

        this.delete = (doctor, index) => {
          doctorsService.delete(doctor).then(() => {
            this.doctors.splice(index, 1);
          });
        };

        $scope.$on('id-doctor-added', performQuery);
      }]
    }
  });

