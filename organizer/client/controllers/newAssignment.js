AutoForm.addHooks('newAssignmentForm', {
  onSubmit: function (insertDoc) {
    var assignment_id = Assignments.insert({
      course_code: insertDoc.course_code,
      title: insertDoc.title, 
      due_date: insertDoc.due_date,
      label: insertDoc.label, 
      function(){
        if (insertDoc.url){
          url : insertDoc.url.indexOf("http://") == 0 ? insertDoc.url : "http://" + insertDoc.url //The link given starts with http://
        }
      }
    });

    var description_id = AssignmentDescriptions.insert({
      course_code: insertDoc.course_code,
      markdown: Session.get('newAssignment-markdown'),
      date_created: new Date(),
      creator_user_id: Meteor.userId(),
      version: 1
    });

    AssignmentDescriptions.update(description_id, {
      $set:{
        assignment_id: assignment_id
      }
    });

    Router.go('/assignment/' + assignment_id);

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
  }

});

Template.newAssignment.events({
  'keyup textarea[name="markdown"]': function (e, context) {
    Session.set('newAssignment-markdown', e.target.value);
  }
});

Template.newAssignment.onCreated(function(){
  Session.set('newAssignment-markdown', '');
});
