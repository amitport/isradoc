import angular from 'angular';

import 'satellizer';
import 'angular-material';
import '../user-management/index';

class DoctorsService {
  constructor(userManagementUtils, $mdDialog, $mdToast, $http) {
    Object.assign(this, {userManagementUtils, $mdDialog, $mdToast, $http});
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
        this.$mdToast.showSimple('המלצה נמחקה');
      })
      .catch((rejection) => {
        console.error(rejection);
        this.$mdToast.showSimple('היתה בעיה במחיקת ההמלצה, בבקשה נסה שוב מאוחר יותר');
        return Promise.reject();
      })
  }
}
DoctorsService.$inject = ['userManagementUtils', '$mdDialog', '$mdToast', '$http'];

angular.module('id-doctors', ['satellizer', 'ngMaterial', 'id-user-management'])
  .service('doctorsService', DoctorsService);

