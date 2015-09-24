export default class ModelRepo {
    constructor($http, repos, Type) {
        this.$http = $http;
        this.repos = repos;
        this.Type = Type;
    }

    get(objId, langId = 'he') {
        return this.$http.get(`${this.Type.path}/${objId}/${langId}.json`).then(
            (response) => {
                return new this.Type(response.data, this.repos)
            }
        );
    }
}