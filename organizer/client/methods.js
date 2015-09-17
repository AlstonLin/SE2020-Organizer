Methods = {
  getUserData: function () {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var promise = fb.getUserData();
    return promise;
  },

  /*

  usage:

  Methods.isInGroup(function (res) {
    if (res) {
      // yay!
    } else {
      // boo ...
    }
  });

   */

  isInGroup: function (cb) {
    var user = Meteor.user();
    var fb = new Facebook(user.services.facebook.accessToken);
    fb.searchGroupForUser(
      Constants.groupId,
      user.services.facebook.id,
      cb
    );
  }
};