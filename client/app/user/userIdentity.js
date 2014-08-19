/**
 * Created by tkulish on 6/24/2014.
 */

angular.module('plutusApp').factory('userIdentity', function() {

    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles;

    return {
        currentUser: undefined,
        isAuthenticated: function () {
            console.log("Executed isAuthenticated and will return: " + !!this.currentUser );
            return !!this.currentUser;
        },
        goHome: function () {
            return false;
        },
        accessAllowed: function(currentAccess, role) {

            if(role === undefined) {
                role = userRoles.public;
            }

            if(currentAccess.bitMask & role.bitMask) {
                console.log("returning TRUE");
                return true;
            }
            else
            {
                console.log("returning FALSE");
                return false;
            }
        }
    }
});