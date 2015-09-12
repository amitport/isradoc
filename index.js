import angular from 'angular';
import 'angular-material';
import './stylesheets/index.css!';

const app = angular.module('isradoc', ['ngMaterial']);

app.controller('clinicsController', ['$scope', function ($scope) {
    $scope.clincs = [{
        show: true
    }]
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['isradoc'], {strictDi: true});
});