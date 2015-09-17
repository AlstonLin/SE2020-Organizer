Methods = {
  getUserData: function () {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var promise = fb.getUserData();
    return promise;
  },

  getMembers: function () {
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var promise = fb.getGroupMembers();
    return promise;
  }
};