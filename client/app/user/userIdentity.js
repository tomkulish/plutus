/**
 * Created by tkulish on 6/24/2014.
 */

angular.module('plutusApp').factory('userIdentity', function() {
    return {
        currentUser: undefined,
        isAuthenticated: function () {
            console.log("Executed isAuthenticated and will return: " + !!this.currentUser );
            return !!this.currentUser;
        }
    }
});