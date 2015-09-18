Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  template: 'home'
});

Router.route('/course/:code', function () {
  this.render('course', {
    data: function () {
      return {
        course: Courses.findOne({code: this.params.code})
      };
    }
  })
});

Router.route('/new-assignment', function () {
  this.render('newAssignment', {
    data: function () {
      return {
        course_code: this.params.query.course_code || null
      };
    }
  });
});
