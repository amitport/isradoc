import angular from 'angular';
import 'angular-material';
import 'satellizer';
import moment from 'moment';
import 'moment/locale/he';


angular.module('id-recommendations', ['satellizer', 'ngMaterial', 'id-user-management'])
  .directive('idFocus', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          $timeout(function(){element.focus()}, 300);
        }
      };
  }])
  .controller('RecommendationsController', ['$auth', '$mdDialog', '$mdToast', '$http', '$rootScope', function ($auth, $mdDialog, $mdToast, $http, $rootScope) {
    this.addRecommendation = (event) => {
      $mdDialog.show(
        {
          focusOnOpen: false,
          targetEvent: event,
          clickOutsideToClose: true,
          template: `
<md-dialog>
  <form name="recommendationForm">
  <md-dialog-content class="md-dialog-content">
    <div ng-if="isAuthenticated()" layout="column" class="md-inline-form md-dialog-content-body">
        <md-input-container class="md-block">
          <label>תוכן ההמלצה</label>
          <textarea id-focus style="height: 200px; width: 400px;" required name="recommendation" md-no-autogrow ng-model="user.recommendation" columns="1" minlength="15" md-maxlength="250" rows="5"></textarea>
          <div ng-messages="recommendationForm.recommendation.$error" role="alert">
            <div ng-message-exp="['required', 'minlength', 'md-maxlength']">
בבקשה מלא בין 15 ל-250 תווים
            </div>
          </div>
        </md-input-container>

    </div>
    <div ng-show="!isAuthenticated()" class="md-dialog-content-body">
      <p><md-button ng-click="authenticate()">כניסה</md-button></p>
    </div>
  </md-dialog-content>
  <md-dialog-actions ng-show="isAuthenticated()">
    <button class="md-primary md-button" ng-disabled="recommendationForm.$invalid" type="button" ng-click="publishRecommendation()">פרסם</button>
  </md-dialog-actions>
  </form>
</md-dialog>`,
          controller: ['$scope', '$rootScope', '$mdDialog', function AuthDialogController($scope, $rootScope, $mdDialog) {
            $scope.isAuthenticated = $rootScope.isAuthenticated;
            $scope.authenticate = function () {
              $rootScope.authenticate();
            };
            $scope.user = {recommendation: ''},
            $scope.publishRecommendation = function () {
              $mdDialog.hide($scope.user.recommendation);
            };
          }]
        }).then((content) => {
          $http.post('/recommendations', {content: content}).then((response) => {
            if (response.status !== 201) {
              console.error('invalid http - status(%s) - content(%o)', response.status, response);
              $mdToast.showSimple('היתה בעיה בשמירת ההמלצה, בבקשה נסה שוב מאוחר יותר');
              return;
            }
            $mdToast.showSimple('המלצה נשמרה בהצלחה!');
            const recommendationId = response.data;
            // todo createdAt

            this.recommendations.unshift({
              _id: recommendationId,
              issuer: {
                displayName: $rootScope.user.displayName,
                avatarImageUrl: $rootScope.user.avatarImageUrl
              },
              content: content
            });
          });
      });
    };
    this.recommendations = [];

    $http.get('/recommendations').then((response) => {
      if (response.status === 200) {
        Array.prototype.push.apply(this.recommendations, response.data.map((r) => {
          return {issuer: r.issuer, content: r.content, createdAt: moment(r.createdAt).calendar()};
        })); // using push apply because of  weird issue with concat
      }
    })
  }]);
