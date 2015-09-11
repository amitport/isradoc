import angular from 'angular';
import 'angular-material';
import './stylesheets/index.css!';

angular.module('isradoc', ['ngMaterial']);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['isradoc'], {strictDi: true});
});