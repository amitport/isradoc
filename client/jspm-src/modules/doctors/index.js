import angular from 'angular';

import 'satellizer';
import 'angular-material';
import '../user-management/index';

angular.module('id-doctors', ['satellizer', 'ngMaterial', 'id-user-management']);
