import {DocRepo} from './doc';
import {ClinicRepo} from './clinic';

export default class Repos {
    constructor($http) {
        this.doc = new DocRepo($http, this);
        this.clinic = new ClinicRepo($http, this);
    }
}

Repos.$inject = ['$http'];