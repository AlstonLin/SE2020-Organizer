Template.index.events( 'click .btn-google': ->
    Meteor.loginWithGoogle(
      requestPermissions: ['email']
    , (error)->
      console.log error.reason if error
    )