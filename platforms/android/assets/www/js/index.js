/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.runGeoLocation();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },

    runGeoLocation: function () {

      var onSuccess = function(position) {


        // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');

        var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude},
            markerA,
            markerB;
        function initialize() {
          var bangalore = { lat: position.coords.latitude, lng: position.coords.longitude };
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: bangalore
          });

          markerA = new google.maps.Marker({
            position: myLatLng,
            label: 'A',
            map: map
          });

          google.maps.event.addListener(map, 'click', function(event) {
            moveMarkerB(event.latLng, map);
          });

        }

        function moveMarkerB (location, map) {
          if (markerB) {
            markerB.setPosition(location);
          } else {
            markerB = new google.maps.Marker({
              position: location,
              label: 'B',
              map: map
            });
          }
          document.getElementById("latFld").value = location.lat();
          document.getElementById("lngFld").value = location.lng();
        }

        initialize();
    };

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
};

app.initialize();
