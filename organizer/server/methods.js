Meteor.methods({
  createAssignment: function (doc) {
    check(doc.course_code, String);
    check(doc.title, String);
    check(doc.label, Number);
    check(doc.due_date, Date);
    Assignments.insert(doc);
  }
});