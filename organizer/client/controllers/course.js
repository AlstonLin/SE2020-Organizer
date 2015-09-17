Template.course.helpers({
  assignments: function () {
    return Assignments.find({code: this.course.code});
  }
});