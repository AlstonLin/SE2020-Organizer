Template.nav.helpers({
  courses: function () {
    return Courses.find();
  },
  showBadge: function (code) {
    return !!Assignments.findOne({course_code: code});
  },
  getBadge: function (code) {
    return Assignments.find({course_code: code}).count();
  }
});
