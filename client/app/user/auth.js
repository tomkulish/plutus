/**
 * Created by tkulish on 6/30/2014.
 */

angular.module('plutusApp').factory('plutusAuth', function($http, userIdentity, $q) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                console.log("Trying to login");
                if (response.data.success) {
                    console.log("Data: " + response.data.user);
                    userIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    }
});