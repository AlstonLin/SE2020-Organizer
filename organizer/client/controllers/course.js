Template.course.helpers({
  assignments: function () {
    return Assignments.find({course_code: this.course.code});
  }
});