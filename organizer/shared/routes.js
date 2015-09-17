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
