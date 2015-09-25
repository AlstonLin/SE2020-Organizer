Template.header.helpers({
	getAvatarURL: function () {
		return Methods.getFacebookAvatarURL(Meteor.userId());
	}
});

Template.header.events({
  'click .js-logout': function () {
    Meteor.logout();
  },
  'submit .navbar-form': function (e) {
    e.preventDefault();
  }
});