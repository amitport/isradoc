import angular from 'angular';
import 'angular-material';
import './stylesheets/index.css!';
import {DocRepo} from './doc';

const app = angular.module('isradoc', ['ngMaterial']);

app.service('DocRepo', DocRepo);
app.run(['$rootScope', 'DocRepo', async function($rootScope, DocRepo) {
    $rootScope.doc = await DocRepo.get('ariela_portnoy_hidas', 'he');
}]);
app.controller('clinicsController', ['$scope', function ($scope) {
    $scope.clinics = [{
        show: true
    }]
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['isradoc'], {strictDi: true});
});