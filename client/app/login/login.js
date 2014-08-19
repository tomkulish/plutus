
// Completely ignoring this due to the fact we are calling this plutusApp.login :-)
angular.module('plutusApp.login', [
  'ui.router'
])

// This is being used though!
angular.module('plutusApp').controller('LoginCtrl', function ($scope, $http, plutusNotifier, plutusAuth) {
    $scope.signin = function(username, password) {
        plutusAuth.authenticateUser(username, password).then(function (success) {
            if(success) {
                plutusNotifier.notify('success','You have succesfully signed in!');
            } else {
                plutusNotifier.notify('error','Username/Password combination incorrect');
            }
        });
    }
});