import Repo from './repo'

export class Doc {
    constructor(json) {
        Object.assign(this, json);

        Reflect.defineProperty(this.name, 'full', {
            get: function () { return `${this.title} ${this.first} ${this.last}`; }
        });
    }
}
Doc.path = 'doctors';

export class DocRepo extends Repo {
    constructor($http) {
        super($http, Doc)
    }
}

DocRepo.$inject = ['$http'];

