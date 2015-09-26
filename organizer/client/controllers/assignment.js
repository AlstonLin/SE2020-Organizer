Session.set('edit-markdown', '');
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
  },
  getDescription: function(assignment){
    var markdownText = AssignmentDescriptions.find({
      assignment_id: assignment._id
    }, {
      sort: {version: -1}
    }).fetch()[0].markdown;
    Session.set('edit-markdown', markdownText);
    return markdownText;
  },
  markdownText: function () {
    return Session.get('edit-markdown');
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
  },

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
  },
  "click .submit": function(event){
    var old = AssignmentDescriptions.find({
      assignment_id: this.assignment._id
    }, {sort: {
      version: -1
    }}).fetch()[0];
    var text = Session.get('edit-markdown');
    AssignmentDescriptions.insert({
      assignment_id: old.assignment_id,
      course_code: old.course_code,
      markdown: Session.get('edit-markdown'),
      date_created: new Date(),
      creator_user_id: Meteor.userId(),
      version: old.version + 1
    });
    $('#editModal-'+old.assignment_id).modal('hide');
  },
  'keyup textarea[name="markdown"]': function (e, context) {
    Session.set('edit-markdown', e.target.value);
  }
});
