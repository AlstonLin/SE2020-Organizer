// Sets up the MongoDB collections
//
// notice the lack of 'var' below - this makes these variables accessible in
// any module.
Courses = new Mongo.Collection('courses');
Courses.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String
  }
}));

Assignments = new Mongo.Collection('assignments');
Assignments.attachSchema(new SimpleSchema({
  course_code: {
    type: String,
    label: 'Course'
  },
  title: {
    type: String,
    label: 'Title'
  },
  due_date: {
    type: Date,
    label: 'Due Date',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  label: {
    type: Number,
    label: "Label",
    allowedValues: [0, 1, 2, 3, 4], //Reading -> 0, Not Graded -> 1, Graded -> 2
    autoform: {
      options: [
        {label: "Reading", value: 0},
        {label: "Not Graded", value: 1},
        {label: "Graded", value: 2},
        {label: "Quiz", value: 3},
        {label: "Exam", value: 4}
      ]
    }
  },
  completed: {
    type: [String],
    defaultValue: []
  }, 
  url: {
    optional: true,
    type: String,
    label: "URL (Optional)"
  }
}));

AssignmentComments = new Mongo.Collection('assignment_comments');
AssignmentComments.attachSchema(new SimpleSchema({
  assignment_id: {
    type: String
  },
  creator_user_id: {
    type: String
  },
  date_created: {
    type: Date
  },
  message: {
    type: String
  }
}));

LectureNotes = new Mongo.Collection('lecture_notes');
LectureNotes.attachSchema(new SimpleSchema({
  course_code: {
    type: String
  },
  creator_user_id: {
    type: String
  },
  date_created: {
    type: Date
  },
  lecture_date: {
    type: Date,
    label: 'Lecture Date',
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  markdown: {
    type: String
  }
}));


AssignmentDescriptions = new Mongo.Collection('assignment_descriptions');
AssignmentDescriptions.attachSchema(new SimpleSchema({
  course_code:{
    type: String
  },
  assignment_id: {
    type: String,
    defaultValue: ""
  },
  creator_user_id: {
    type: String
  },
  markdown: {
    type: String
  },
  date_created: {
    type: Date
  }, 
  version: {
    type: Number
  }
}));

ValidUsers = new Mongo.Collection('valid_users');
ValidUsers.attachSchema(new SimpleSchema({
  id:{
    type: String
  },
  valid:{
    type: Boolean
  }
}));