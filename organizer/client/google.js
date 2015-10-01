

/**
 * Check if current user has authorized this application.
 */
Google = function Google(CLIENT_ID, SCOPES){
  this.CLIENT_ID = '873336750987-0aa8kjl7ijkhsvq6f4kh25fun292ju2r.apps.googleusercontent.com';
  this.SCOPES = ["https://www.googleapis.com/auth/calendar"];

  Google.prototype.checkAuth = function() {
    gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPES,
          'immediate': true,
          'approval_prompt': 'auto',
          'login_hint': 'SE2020Organizer@gmail.com'
        }, this.handleAuthResult);
    }

  /**
   * Load Google Calendar client library. List upcoming events
   * once client library is loaded.
   */
  Google.prototype.addCalendarevent = function(assignment) {
      var event = {
        'summary': assignment.title,
        'start': {
        'dateTime': assignment.due_date
        } 
      }
  }
  Google.prototype.loadCalendarApi = function(assignment) {
    gapi.client.load('calendar', 'v3', addCalendarEvent(assignment));
  }

    /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */

  Google.prototype.handleAuthResult = function(authResult, assignment) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      this.loadCalendarApi(assignment);
      authorizeDiv.style.display = 'inline';
    }
  }