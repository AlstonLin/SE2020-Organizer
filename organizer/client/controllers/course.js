Template.course.helpers({
  assignments: function() {
    return Assignments.find({
      course_code: this.course.code
    });
  },

  isCompleted: function() {
    return this.completed == null ? false : (this.completed.indexOf(Meteor.userId()) !== -1);
  },

  isReading: function() {
    return this.label == 0;
  },

  isNotGraded: function() {
    return this.label == 1;
  },

  isGraded: function() {
    return this.label == 2;
  },

});

Template.course.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});

Template.course.events({
  "click .toggle-completed": function(event) { //Adds the user to the list of users who have completed
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
    var comment = {
      author: Meteor.user().profile.name,
      date: new Date(),
      message: text
    };
    if (this.comments == null) {
      this.comments = []
    }
    this.comments.push(comment);
    Assignments.update(this._id, {
      $set: {
        comments: this.comments
      }
    })
    event.target.text.value = "";
    event.preventDefault();
  }
})