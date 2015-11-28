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
    this.addRecommendation = (event, recommendation) => {
      const editing = recommendation ? true : false;
      $mdDialog.show(
        {
          focusOnOpen: false,
          targetEvent: editing ? null : event,
          clickOutsideToClose: true,
          template: `
<md-dialog>
  <form name="recommendationForm">
  <md-dialog-content class="md-dialog-content">
    <div ng-if="isAuthenticated()" layout="column" class="md-inline-form md-dialog-content-body">
        <md-input-container class="md-block">
          <label>תוכן ההמלצה</label>
          <textarea id-focus style="height: 200px; width: 400px;" name="recommendation" md-no-autogrow ng-model="user.recommendation" columns="1" md-maxlength="250" rows="5"></textarea>
          <!--div ng-messages="recommendationForm.recommendation.$error" role="alert">
            <div ng-message-exp="['required', 'minlength', 'md-maxlength']">
בבקשה מלא בין 15 ל-250 תווים
            </div>
          </div--->
        </md-input-container>

    </div>
    <div ng-show="!isAuthenticated()" class="md-dialog-content-body" layout="column">
      <!--<div layout="column">-->
        <md-button ng-click="authenticate()" class="md-raised">
          <span layout="row" layout-align="start center">
            <img src="images/Google_-G-_Logo.svg" width="18" height="18">
            <span flex style="margin:0 24px; text-align: start;">
            אמת זהות
          באמצעות גוגל</span>
          </span>
        </md-button>
        <md-button ng-disabled="true" class="md-raised">
          <span layout="row" layout-align="start center">
            <img src="images/Facebook_-F-_Logo.svg" width="18" height="18">
            <span flex style="margin:0 24px; text-align: start;">
            אמת זהות
          באמצעות פייסבוק</span>
          <small class="md-caption">(לא נתמך)</small>
          </span>
        </md-button>

      <!--</div>-->
      <!--<md-button ng-click="authenticate()">אמת זהות</md-button>-->
    </div>
  </md-dialog-content>
  <md-dialog-actions ng-show="isAuthenticated()">
    <button class="md-primary md-button" ng-disabled="recommendationForm.$invalid" type="button" ng-click="publishRecommendation()">{{editing ? 'ערוך' : 'פרסם'}}</button>
  </md-dialog-actions>
  </form>
</md-dialog>`,
          controller: ['$scope', '$rootScope', '$mdDialog', function AuthDialogController($scope, $rootScope, $mdDialog) {
            $scope.isAuthenticated = $rootScope.isAuthenticated;
            $scope.authenticate = function () {
              $rootScope.authenticate();
            };
            $scope.editing = editing;

            $scope.user = {recommendation: (editing && recommendation.content) || ''};
            $scope.publishRecommendation = function () {
              $mdDialog.hide($scope.user.recommendation);
            };
          }]
        }).then((content) => {
          if (editing) {
            $http.put(`/recommendations/${recommendation._id}`, {content: content}).then((response) => {
              $mdToast.showSimple('השינויים נשמרו בהצלחה!');
              recommendation.content = content;
              recommendation.updatedAt = moment(response.data.updatedAt).calendar();
            }).catch((rejection) => {
              console.error('failed request - status(%s) - rejection(%o)', rejection.status, rejection);
              $mdToast.showSimple('היתה בעיה בשמירת השינויים, בבקשה נסה שוב מאוחר יותר');
            });
          } else {
            $http.post('/recommendations', {content: content}).then((response) => {
              $mdToast.showSimple('ההמלצה נשמרה בהצלחה!');
              this.recommendations.unshift(
                {
                _id:  response.data._id,
                issuer: {
                  _id: $rootScope.user._id,
                  displayName: $rootScope.user.displayName,
                  avatarImageUrl: $rootScope.user.avatarImageUrl
                },
                content: content,
                createdAt: moment(response.data.createdAt).calendar()
              });
              this.canAddRecommendation = false;
            }).catch((rejection) => {
              console.error('failed request - status(%s) - rejection(%o)', rejection.status, rejection);
              $mdToast.showSimple('היתה בעיה בשמירת ההמלצה, בבקשה נסה שוב מאוחר יותר');
            });
          }
      });
    };

    this.recommendations = [];

    this.delete = (recommendation, index) => {
      $http.delete(`/recommendations/${recommendation._id}`)
        .then((response) => {
          $mdToast.showSimple('המלצה נמחקה');
          this.recommendations.splice(index, 1);
          this.canAddRecommendation = true;
        })
        .catch((rejection) => {
          console.error(rejection);
          $mdToast.showSimple('היתה בעיה במחיקת ההמלצה, בבקשה נסה שוב מאוחר יותר');
        })
    };
    $http.get('/recommendations').then((response) => {
      if (response.status === 200) {
        Array.prototype.push.apply(this.recommendations, response.data.map((r) => {
          const res = {_id: r._id, issuer: r.issuer, content: r.content, createdAt: moment(r.createdAt).calendar()};
          if (r.updatedAt !== r.createdAt) {
            res.updatedAt = moment(r.updatedAt).calendar();
          }
          return res;
        })); // using push apply because of  weird issue with concat
        if (!$rootScope.user || this.recommendations.every((r) => r.issuer._id !== $rootScope.user._id)) {
         this.canAddRecommendation = true;
        }
      }
    });
  }]);
