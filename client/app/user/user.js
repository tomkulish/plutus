angular.module('plutusApp.user', [
  'ui.router'
])
  
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        // Contacts //
        //////////////
        .state('contacts', {

          // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of it's children.
          abstract: true,

          // This abstract state will prepend '/contacts' onto the urls of all its children.
          url: '/contacts',

          // Example of loading a template from a file. This is also a top level state,
          // so this template file will be loaded and then inserted into the ui-view
          // within index.html.
          templateUrl: 'app/contacts/contacts.html',

          // Use `resolve` to resolve any asynchronous controller dependencies
          // *before* the controller is instantiated. In this case, since contacts
          // returns a promise, the controller will wait until contacts.all() is
          // resolved before instantiation. Non-promise return values are considered
          // to be resolved immediately.
          resolve: {
            contacts: ['contacts',
              function( contacts){
                return contacts.all();
              }]
          },

          // You can pair a controller to your template. There *must* be a template to pair with.
          controller: ['$scope', '$state', 'contacts', 'utils',
            function (  $scope,   $state,   contacts,   utils) {

              // Add a 'contacts' field in this abstract parent's scope, so that all
              // child state views can access it in their scopes. Please note: scope
              // inheritance is not due to nesting of states, but rather choosing to
              // nest the templates of those states. It's normal scope inheritance.
              $scope.contacts = contacts;

              $scope.goToRandom = function () {
                var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                // $state.go() can be used as a high level convenience method
                // for activating a state programmatically.
                $state.go('contacts.detail', { contactId: randId });
              };
            }]
        })
               /////////////////////
        // Contacts > List //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'contacts' state.
        .state('contacts.list', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/contacts' (because '/contacts' + '').
          url: '',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within contacts.html. This is the
          // most important thing to remember about templates.
          templateUrl: 'app/contacts/contacts.list.html'
        });
    }
  ]
);
