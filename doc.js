import ModelRepo from './modelRepo'

export class Doc {
    constructor(json, objId, repos) {
        Object.assign(this, json);
        this.id = objId;

        Reflect.defineProperty(this.name, 'full', {
            get: function () { return `${this.title} ${this.first} ${this.last}`; }
        });

        Promise.all(this.clincIds.map(async function (clinicId) {
            return await repos.clinic.get(clinicId);
        })).then((clinics) => {
            this.clinics = clinics;
        });

    }
}
Doc.path = 'doctors';

export class DocRepo extends ModelRepo {
    constructor($http, repos) {
        super($http, repos, Doc)
    }
}

