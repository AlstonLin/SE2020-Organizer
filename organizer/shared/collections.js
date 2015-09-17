// Sets up the MongoDB collections
//
// notice the lack of 'var' below - this makes these variables accessible in
// any module.
Courses = new Mongo.Collection('courses');
Assignments = new Mongo.Collection('assignments');