'use strict';
angular.module('mapApp', ['fsCordova']).controller('MyController', function($scope, CordovaService) {
    CordovaService.ready.then(function() {

      $scope.approach = 20;

      var onSuccess = function(position) {
        function initialize() {
          var myLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLatLng
          });

          $scope.markerA = new google.maps.Marker({
            position: myLatLng,
            label: 'A',
            map: map
          });

          google.maps.event.addListener(map, 'click', function(event) {
            $scope.moveMarkerB(event.latLng, map);
            $scope.formLocatio.Latitude = event.latLng.lat();
            $scope.formLocatio.Longitude = event.latLng.lng();
            $scope.$apply();
          });
        }
        initialize();
      };

      var onError = function (error) {
        navigator.notification.alert(
          'code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }

      $scope.calcDistance = function () {

        if ($scope.markerB && $scope.markerA) {
          var distance = $scope.getDistanceFromLatLonInKm($scope.markerB.position.lat(), $scope.markerB.position.lng(), $scope.markerA.position.lat(), $scope.markerA.position.lng());
          if (distance <= $scope.approach) {
            navigator.notification.confirm(
              'Mission complete' + '\n' + 'Respect +',
              onConfirm,
              'mission complete',
              ['Ok']
            );
          }
          function onConfirm(argg) {
            $scope.markerB.setMap(null);
          }
        }
      }

    $scope.moveMarkerB = function (location, map) {

      if ($scope.markerB) {
        $scope.markerB.setPosition(location);
      } else {
        $scope.markerB = new google.maps.Marker({
          position: location,
          label: 'B',
          map: map
        });
      }
      $scope.calcDistance();
    }

    $scope.moveMarkerA = function (location) {
      $scope.markerA.setPosition(location);
      $scope.calcDistance();
    }

    $scope.setTargetByButton = function () {
      var targetLatLng = new google.maps.LatLng($scope.formLocatio.Latitude,$scope.formLocatio.Longitude)
      $scope.moveMarkerB(targetLatLng, map);
    }

    $scope.getDistanceFromLatLonInKm = function (lat1,lon1,lat2,lon2) {
      var R = 6371000; // Radius of the earth in M
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in M

      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      return parseInt(d);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    navigator.geolocation.watchPosition(function (position) {
      var location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      $scope.moveMarkerA (location);
    });
  });
});
