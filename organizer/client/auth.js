Accounts.onLogin(function(){
  Methods.isInGroup(function(inGroup){
    var user = ValidUsers.findOne({
      id: Meteor.userId
    });
    if (user){ //Already in the Collection
      if (user.valid != inGroup){
        ValidUsers.update(user.id, {
          $set: {valid : inGroup}
        });
      }
    }else{ //New User
      ValidUsers.insert({
        id : Meteor.userId(),
        valid : inGroup
      });
    }
  });
});
