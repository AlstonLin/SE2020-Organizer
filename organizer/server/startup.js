Meteor.startup(function () {
  if (Courses.find().count() === 0) {
    // Initialize the Courses when you start development.
    Courses.insert({name: 'Programming Principles', code: 'CS 137'});
    Courses.insert({name: 'Linear Circuits', code: 'ECE 140'});
    Courses.insert({name: 'Physics', code: 'ECE 105'});
    Courses.insert({name: 'Linear Algebra', code: 'MATH 115'});
    Courses.insert({name: 'Calculus 1', code: 'MATH 117'});
    Courses.insert({name: 'Methods of Software Engineering', code: 'SE 101'});
  }
});