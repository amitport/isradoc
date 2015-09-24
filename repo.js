export default class Repo {
    constructor($http, Type) {
        this.$http = $http;
        this.Type = Type;
    }

    get(objId, langId) {
        return this.$http.get(`${this.Type.path}/${objId}/${langId}.json`).then(
            (response) => {
                return new this.Type(response.data)
            }
        );
    }
}