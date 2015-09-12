import angular from 'angular';
import 'angular-material';
import './stylesheets/index.css!';

const app = angular.module('isradoc', ['ngMaterial']);

app.controller('clinicsController', ['$scope', function ($scope) {
    $scope.clinics = [{
        show: true
    }]
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['isradoc'], {strictDi: true});
});