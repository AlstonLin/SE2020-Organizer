Template.course.helpers({
  assignments: function () {
    return Assignments.find({course_code: this.course.code});
  },

  isCompleted: function () {
  	return this.completed == null ? false : contains(this.completed, Meteor.user().services.facebook.id); 
  },

  isReading: function(){
    return this.label == 0;
  },

  isNotGraded: function(){
    return this.label == 1;
  },

  isGraded: function(){
    return this.label == 1;
  }
});

function contains(array, id){ //Helper function for isCompleted
  for (var i = 0; i < array.length; i++){
    var element = array[i];
    if (element == id){
      return true;
    }
  }
  return false;
};

Template.course.events({
	"click .toggle-completed" : function(event){ //Adds the user to the list of users who have completed
    if (this.completed == null) { this.completed = [];} 
    if (event.target.checked){ //Checked completed
      this.completed.push(Meteor.user().services.facebook.id);
    }else{ //Unchecked
      delete this.completed[this.completed.indexOf(Meteor.user().services.facebook.id)];
    }
    Assignments.update(this._id, {$set: {completed: this.completed}})
	}
})