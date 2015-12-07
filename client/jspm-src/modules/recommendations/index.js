import angular from 'angular';
import 'angular-material';
import 'satellizer';
import '../user-management/index';

import moment from 'moment';
import 'moment/locale/he';


angular.module('id-recommendations', ['satellizer', 'ngMaterial', 'id-user-management'])
  .directive('idFocus', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        $timeout(function () {
          element.focus()
        }, 300);
      }
    };
  }])
  .directive('recommendations', function () {
    return {
      controllerAs: 'ctrl',
      templateUrl: 'partials/recommendations/index.html',
      bindToController: {
        targetId: '@'
      },
      controller: ['$auth', '$mdDialog', '$mdToast', '$http', 'userManagementUtils',
        function ($auth, $mdDialog, $mdToast, $http, userManagementUtils) {
          this.auth = userManagementUtils;
          this.addRecommendation = (event, recommendation) => {
            const editing = recommendation ? true : false;

            function showEditDialog(event) {
              return $mdDialog.show(
                {
                  focusOnOpen: false,
                  targetEvent: event,
                  clickOutsideToClose: true,
                  templateUrl: 'partials/recommendations/addRecommendationDialog.html',
                  controller: ['$scope', '$mdDialog', function AuthDialogController($scope, $mdDialog) {
                    $scope.editing = editing;

                    $scope.user = {recommendation: (editing && recommendation.content) || ''};
                    $scope.publishRecommendation = function () {
                      $mdDialog.hide($scope.user.recommendation);
                    };
                  }]
                })
            }

            const getRecommendationFromUser = () => {
              return userManagementUtils.interactiveEnsureAuth(editing ? null : event, () => {
                updateCanAddRecommendation();
                if (this.canAddRecommendation) {
                  return showEditDialog();
                } else {
                  $mdToast.showSimple('כבר כתבת בעבר המלצה עבור רופא זה');
                  return Promise.reject();
                }
              });
            };

            getRecommendationFromUser().then((content) => {
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
                $http.post('/recommendations', {content: content, target: this.targetId}).then((response) => {
                  $mdToast.showSimple('ההמלצה נשמרה בהצלחה!');
                  this.recommendations.unshift(
                    {
                      _id: response.data._id,
                      issuer: {
                        _id: userManagementUtils.user._id,
                        displayName: userManagementUtils.user.displayName,
                        avatarImageUrl: userManagementUtils.user.avatarImageUrl
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
          $http.get('/recommendations', {
            params: {q: {target: this.targetId}}}
          ).then((response) => {
            if (response.status === 200) {
              Array.prototype.push.apply(this.recommendations, response.data.map((r) => {
                const res = {
                  _id: r._id,
                  issuer: r.issuer,
                  content: r.content,
                  createdAt: moment(r.createdAt).calendar()
                };
                if (r.updatedAt !== r.createdAt) {
                  res.updatedAt = moment(r.updatedAt).calendar();
                }
                return res;
              })); // using push apply because of  weird issue with concat
              updateCanAddRecommendation();
            }
          });

          const updateCanAddRecommendation = () => {
            this.canAddRecommendation =
              (!userManagementUtils.user || this.recommendations.every((r) => r.issuer._id !== userManagementUtils.user._id))
                ? true : false;
          };
        }]
    }
  });
