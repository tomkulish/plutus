
// Completely ignoring this due to the fact we are calling this plutusApp.login :-)
angular.module('plutusApp.login', [
  'ui.router'
])
  
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider.state('login', {
                  // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of it's children.
          abstract: true,

          // This abstract state will prepend '/contacts' onto the urls of all its children.
          url: '/login',

          // Example of loading a template from a file. This is also a top level state,
          // so this template file will be loaded and then inserted into the ui-view
          // within index.html.
          templateUrl: 'app/login/login.html'
            })
    }]);

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