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
  },

  getFacebookAvatarURL: function(userId){
    var id = Meteor.users.findOne(userId).services.facebook.id;
    return "http://graph.facebook.com/" + id + "/picture?type=large";
  },

  validLogin: function (){
    if (!Meteor.user()){
      return false;
    }else{
      return ValidUsers.find({
        id: Meteor.userId()
      }).fetch(); 
    }
  }
};

Template.registerHelper("validLogin", function(){
  return Methods.validLogin();
});
