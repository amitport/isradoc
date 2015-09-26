import ModelRepo from './modelRepo'

export class Clinic {
    constructor(json, objId) {
        Object.assign(this, json);
        this.id = objId;

        this.show = true;

        this.mapResourceUrl = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(this.addressForGoogle)}&language=iw&key=AIzaSyBNmOomOEwinx8kvki-JG-ipNbf2abaHfQ`;
    }
}
Clinic.path = 'clinics';

export class ClinicRepo extends ModelRepo {
    constructor($http, repos) {
        super($http, repos, Clinic)
    }
}
