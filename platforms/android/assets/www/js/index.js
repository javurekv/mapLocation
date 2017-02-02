
angular.module('mapApp', []);

var onDeviceReady = function() {
  angular.bootstrap(document, ['mapApp']);
}
document.addEventListener('deviceready', onDeviceReady);
