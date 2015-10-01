Session.set('assignment-edit-markdown', '');
Session.set('assignment-editing-markdown', false);

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
  markdownText: function () {
    var editingText = Session.get('assignment-edit-markdown');
    return editingText;
  },

  description() {
    var desc = AssignmentDescriptions.findOne({
      assignment_id: this.assignment._id
    }, {
      sort: {version: -1}
    });
    return desc;
  },


  
  isEditingDesc: function () {
    return Session.get('assignment-editing-markdown');
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
  "click .js-save-desc": function(event){
    var old = AssignmentDescriptions.find({
      assignment_id: this.assignment._id
    }, {
      sort: {
        version: -1
      },
      limit: 1
    }).fetch()[0];
    var text = Session.get('assignment-edit-markdown');
    var version = 1;
    if (old) {
      version = old.version + 1;
    }
    AssignmentDescriptions.insert({
      assignment_id: this.assignment._id,
      markdown: Session.get('assignment-edit-markdown'),
      date_created: new Date(),
      creator_user_id: Meteor.userId(),
      version: version 
    });
    Session.set('assignment-editing-markdown', false);
  },
  'keyup textarea[name="markdown"]': function (e, context) {
    Session.set('assignment-edit-markdown', e.target.value);
  },
  "click .js-edit-desc": function () {
    var desc = AssignmentDescriptions.findOne({
      assignment_id: this.assignment._id
    }, {
      sort: {version: -1}
    });
    Session.set('assignment-editing-markdown', 
      !Session.get('assignment-editing-markdown'));
    if (desc) {
      Session.set('assignment-edit-markdown', desc.markdown);
    }
  },
});
