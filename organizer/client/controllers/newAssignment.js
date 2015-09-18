Template.newAssignment.helpers({
  courseOptions: function () {
    return Courses.find().map(function (course) {
      return {
        value: course.code,
        label: course.code + ' - ' + course.name
      };
    });
  },

  doc: function () {
    return {
      course_code: this.course_code
    };
  }
});
