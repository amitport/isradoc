export class Doc {
    constructor(json) {
        Object.assign(this, json);

        Reflect.defineProperty(this.name, 'full', {
            get: function () { return `${this.title} ${this.first} ${this.last}`; }
        });
    }
}

export class DocRepo {
    constructor($http) {
        this.$http = $http;
    }

    get(docId, langId) {
        return this.$http.get(`doctors/${docId}/${langId}.json`).then(
            function (response) {
                return new Doc(response.data)
            }
        );
    }
}

DocRepo.$inject = ['$http'];

