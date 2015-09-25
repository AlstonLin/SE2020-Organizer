Session.set('newAssignment-markdown', '');

AutoForm.addHooks('newAssignmentForm', {
  onSubmit: function (insertDoc) {
    AssignmentDescriptions.insert({
      assignment_id: assignment.id,
      course_code: insertDoc.course_code,
      markdown: Session.get('newAssignment-markdown'),
      date_created: new Date(),
      creator_user_id: Meteor.userId(),
      version: 1
    });

    Router.go('/course/' + insertDoc.course_code + "/" + insertDoc.assignment_id);

    return false;
  }
});

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
  }, 
   markdownText: function () {
    return Session.get('newAssignment-markdown');
  },

});

Template.newAssignment.events({
  'keyup textarea[name="markdown"]': function (e, context) {
    Session.set('newAssignment-markdown', e.target.value);
  }
});
