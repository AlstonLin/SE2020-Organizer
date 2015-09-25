Template.assignment.helpers({
  formatCommentDate: function(date) {
    return moment(date).fromNow();
  },

  formatDueDate: function(date) {
    var m = moment(date);
    return m.format('MMM D h:mm A');
  },
  getComments: function(assignment) {
    return AssignmentComments.find({
      assignment_id: assignment._id
    }, {
      sort: {
        date_created: -1
      }
    });
  },   
  getCommentAuthor: function(comment) {
    return Meteor.users.findOne({
      _id: comment.creator_user_id
    }).profile.name;
  }, 
  getCommentAuthorAvatarURL: function (comment) {
  	var author = Meteor.users.findOne({
      _id: comment.creator_user_id
    });
    return Methods.getFacebookAvatarURL(author);
  },
  getCommentCountLabel: function(assignment) {
    return AssignmentComments.find({
      assignment_id: assignment._id
    }).count() || '';
  }
});

Template.assignment.events({
	 "submit .new-comment": function(event) {
    var text = event.target.text.value;
    var blah = this;
    var temp = this.assignment._id;
    AssignmentComments.insert({
      creator_user_id: Meteor.userId(),
      assignment_id: this.assignment._id,
      date_created: new Date(),
      message: text
    });

    event.target.text.value = "";
    event.preventDefault();
  }
});
