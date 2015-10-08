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

<<<<<<< HEAD
  addtoCalendar: function(assignment_id) {
    calendar = Google();
    auth = Google.checkAuth();
    calendar.handleAuthResult(auth, assignment_id);
=======
  validLogin: function (){
    if (!Meteor.user()){
      return false;
    }else{
      return ValidUsers.find({
        id: Meteor.userId()
      }).fetch(); 
    }
  },
  addCalendarevent: function(assignment) {
    var event = {
      'summary': assignment.title,
      'start': {
      'dateTime': assignment.due_date
      } 
    }
  },
  loadCalendarApi: function(assignment) {
  gapi.client.load('calendar', 'v3', addCalendarEvent(assignment));
>>>>>>> origin/master
  }
};

Template.registerHelper("validLogin", function(){
  return Methods.validLogin();
});
