Template.course.helpers({
  assignments: function() {
    return Assignments.find({
      course_code: this.course.code
    }, {
      sort: {
        due_date: 1
      }
    });
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

  getCommentCountLabel: function(assignment) {
    return AssignmentComments.find({
      assignment_id: assignment._id
    }).count() || '';
  },

  formatCommentDate: function(date) {
    return moment(date).fromNow();
  },

  isCompleted: function() {
    return this.completed == null ? false : (this.completed.indexOf(Meteor.userId()) !== -1);
  },

  getLabel: function() {
    switch (this.label){
      case 0:
        return "Reading";
      case 1:
        return "Not Graded";
      case 2:
        return "Graded";
      case 3:
        return "Quiz";
      case 4:
        return "Exam";
      default:
        return "ERROR";
    }
  },

  notes: function () {
    return LectureNotes.find({
      course_code: this.course.code
    });
  },

  getAvatarURL: function () {
    return Methods.getFacebookAvatarURL(Meteor.userId());
  }
});

Template.course.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});

Template.course.events({
  "click .toggle-completed": function(event) {
    //Adds the user to the list of users who have completed
    if (this.completed == null) {
      this.completed = [];
    }
    if (event.target.checked) { //Checked completed
      this.completed.push(Meteor.userId());
    } else { //Unchecked
      delete this.completed[this.completed.indexOf(Meteor.userId())];
    }
    Assignments.update(this._id, {
      $set: {
        completed: this.completed
      }
    })
  },

  "submit .new-comment": function(event) {
    var text = event.target.text.value;

    AssignmentComments.insert({
      creator_user_id: Meteor.userId(),
      assignment_id: this._id,
      date_created: new Date(),
      message: text
    });

    event.target.text.value = "";
    event.preventDefault();
  }
})