import angular from 'angular';
import 'angular-sanitize';
import 'angular-material';
import './stylesheets/index.css!';
import {DocRepo} from './doc';
import {ClinicRepo} from './clinic';

const app = angular.module('isradoc', ['ngMaterial', 'ngSanitize']);

app.service('DocRepo', DocRepo);
app.service('ClinicRepo', ClinicRepo);
app.config(
    ['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow google map api.
            'https://www.google.com/maps/embed/v1/**'
        ]);
    }]
);
app.run(['$rootScope', 'DocRepo', 'ClinicRepo', async function($rootScope, DocRepo, ClinicRepo) {
    $rootScope.doc = await DocRepo.get('ariela_portnoy_hidas', 'he');
    $rootScope.clinics = await* ($rootScope.doc.clincIds.map(async function (clinicId) {
        return await ClinicRepo.get(clinicId, 'he');
    }));

    $rootScope.navigate = function (q) {
        q = encodeURIComponent(q);
        // If it's an iPhone..
        if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
            function iOSversion() {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                }
            }
            var ver = iOSversion() || [0];

            if (ver[0] >= 6) {
                protocol = 'maps://';
            } else {
                protocol = 'http://';

            }
            window.location = protocol + 'maps.apple.com/maps?daddr=' + q;
        }
        else {
            window.open('http://maps.google.com?daddr=' + q);
        }
    };
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['isradoc'], {strictDi: true});
});