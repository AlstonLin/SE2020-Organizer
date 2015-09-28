 Template.body.events({
 'click .login-google': ->
    Meteor.loginWithGoogle(
      requestPermissions: [
      'client_id': '1083594820424-ktg76vch03aa29ctgtcaejefoos04k64.apps.googleusercontent.com'
      'reponse_type': 'code'
      'scope': 'openid profile email'
      ]
    )
});