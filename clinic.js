import Repo from './repo'

export class Clinic {
    constructor(json) {
        Object.assign(this, json);
        this.show = true;

        this.mapResourceUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(this.addressForGoogle)}&language=iw&key=AIzaSyBNmOomOEwinx8kvki-JG-ipNbf2abaHfQ`;
    }
}
Clinic.path = 'clinics';

export class ClinicRepo extends Repo {
    constructor($http) {
        super($http, Clinic)
    }
}

ClinicRepo.$inject = ['$http'];

