/**
 * Copyright 2015 UC Berkeley (UCB) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

(function(angular) {

  'use strict';

  angular.module('collabosphere').controller('AssetLibraryIconBarController', function(assetLibraryFactory, userFactory, $filter, $scope) {

    /**
     * Like an asset. If the asset has been liked by the current user already, the like will be undone
     *
     * @param  {Asset}          asset                           The asset that should be liked or disliked
     */
    $scope.like = function(asset) {
      var liked = (asset.liked === true) ? null : true;
      assetLibraryFactory.like(asset.id, liked).success(function() {
        asset.liked = liked;
        if (liked === true) {
          asset.likes++;
        } else {
          asset.likes--;
        }
        // Indicate that the asset has been updated
        $scope.$emit('assetLibraryAssetUpdated', asset);
      });
    };

    $scope.isAssetUser = function(asset) {
      if ($scope.asset && $scope.me) {
        return ($filter('filter')(asset.users, {'id': $scope.me.id}).length > 0);
      }
    };

    userFactory.getMe().success(function(me) {
      $scope.me = me;
    });

  });

}(window.angular));
