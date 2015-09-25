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

Router.route('/assignment/:id', function () {
  this.render('assignment', {
    data: function () {
      return {
        assignment: Assignments.findOne(this.params.id)
      };
    }
  });
});

Router.route('/lecture-note/:id', function () {
  this.render('lectureNote', {
    data: function () {
      return {
        note: LectureNotes.findOne(this.params.id)
      };
    }
  });
});

Router.route('/new-lecture-note/:course_code', function () {
  this.render('newLectureNote', {
    data: {
      doc: {
        course_code: this.params.course_code
      }
    }
  })
})
