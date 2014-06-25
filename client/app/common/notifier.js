/**
 * Created by tkulish on 6/24/2014.
 */

//angular.module('plutusApp').value('test', toastr);
//angular.module('plutusApp',['ngAnimate', 'toaster']).value('plutusToaster', toaster);

// Ok, so the main issue is the fact I am using Toaster and Toastr WAY TO MANY LIBARIES.
// Figure out which one you want to use. :-) Different implementations and actions for each. This works right now but you
// probably want to fix the pop.
angular.module('plutusApp').factory('plutusNotifier', function(toaster) {
    return {
        notify: function(msg) {
            toaster.pop(msg);
            console.log(msg);
        }
    }
});