AutoForm.addHooks('newLectureNoteForm', {
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    // TODO show interactive form validation

    LectureNotes.insert({
      course_code: insertDoc.course_code,
      lecture_date: insertDoc.lecture_date,
      markdown: Session.get('newLecture-markdown'),
      date_created: new Date(),
      creator_user_id: Meteor.userId()
    });

    Router.go('/course/' + insertDoc.course_code);

    return false;
  }
});

Template.newLectureNote.helpers({
  markdownText: function () {
    return Session.get('newLecture-markdown');
  },
  courseOptions: function () {
    return Courses.find().map(function (course) {
      return {
        value: course.code,
        label: course.code + ' - ' + course.name
      };
    });
  },
});

Template.newLectureNote.events({
  'keyup textarea[name="markdown"]': function (e, context) {
    Session.set('newLecture-markdown', e.target.value);
  }
});

Template.newLectureNote.onCreated(function(){
  Session.set('newLecture-markdown', '');
});