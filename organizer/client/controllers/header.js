Template.header.events({
  'click .js-logout': function () {
    Meteor.logout();
  },
  'submit .navbar-form': function (e) {
    e.preventDefault();
  }
});