// Make sure to include the `ui.router` module as a dependency
'use strict';
angular.module('plutusApp', [
  'plutusApp.contacts',
  'plutusApp.login',
  'ui.router', 
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'toaster'
])

.config(
  [          '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider,   $urlRouterProvider, $locationProvider, $httpProvider) {

     //   var access = routingConfig.accessLevels;

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

    var access = routingConfig.accessLevels;

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a states as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>',
          data: {
                access: access.user
          }

        })
        
        // PUBLIC
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '404'
        })

        // ANYNOMUS Routes
        .state('anon', {
            abstract: true,
            template: "<ui-view/>",
            data: {
               access: access.anon
            }
        })
        .state('anon.login', {
              url: '/login/',
              templateUrl: 'app/login/login.html',
              controller: 'LoginCtrl'
          })
       // .state('login', {
      //      url: '/login/',
      //      templateUrl: 'app/login/login.html',
       //     controller: 'LoginCtrl'
      //  })
        
        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 100);
            }],
              data: {
                  access: access.user
              }
        });

        $urlRouterProvider.otherwise('/404');

        // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
        $urlRouterProvider.rule(function($injector, $location) {
            if($location.protocol() === 'file')
                return;

            var path = $location.path()
            // Note: misnomer. This returns a query object, not a search string
                , search = $location.search()
                , params
                ;

            // check to see if the path already ends in '/'
            if (path[path.length - 1] === '/') {
                return;
            }

            // If there was no search string / query params, return with a `/`
            if (Object.keys(search).length === 0) {
                return path + '/';
            }

            // Otherwise build the search string and return a `/?` prefix
            params = [];
            angular.forEach(search, function(v, k){
                params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
        });

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push(function($q, $location) {
            return {
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        });
    }
  ]
)

    .run(
    [          '$rootScope', '$state', '$stateParams', 'userIdentity',
        function ($rootScope,   $state,   $stateParams, userIdentity) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if(!userIdentity.accessAllowed(toState.data.access)) {
                    console.log("Event: " + event.toString());
                    console.log("fromStateURL: " + fromState.url);
                    console.log("fromState: " + fromState.name);
                    console.log("toState: " + toState.url);
                    console.log("toStateName: " + toState.name);

                    if (!userIdentity.isAuthenticated()) {
                        console.log("Seems like you tried accessing a route you don't have access to... No Authenticated User");
                        $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                        event.preventDefault();

                        console.log("fromState.url: " + fromState.url);
                        if (fromState.url === '^') {
                            if (userIdentity.goHome()) {
                                console.log("Going home...");
                                $state.go('home');
                            } else {
                                console.log("Going to anon.login");
                                $rootScope.error = null;
                                $state.go('anon.login');
                            }
                        }

                        // For some reason it won't just do nothing after we have a from state of annon.login and I don't know why
                    }
                    else {
                        console.log("You have access to the section: " + userIdentity.currentUser);
                    }
                }
            });
        }
    ]
);