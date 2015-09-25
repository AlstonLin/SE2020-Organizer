Facebook = function Facebook(accessToken) {
  // this.fb = FBGraph;
  this.accessToken = accessToken;
  // this.fb.setAccessToken(this.accessToken);
  this.options = {
    timeout: 3000,
    pool: {maxSockets: Infinity},
    headers: {connection: "keep-alive"}
  }
  // this.fb.setOptions(this.options);
};

Facebook.prototype.query = function(query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  return $.ajax({
    method: method,
    url: 'https://graph.facebook.com/' + query,
    data: {
      access_token: this.accessToken
    }
  });
};

Facebook.prototype.queryPaginated = function(query, method, eachCb) {
  var first = this.query(query, method);
  var handler = function handler(res) {
    // If the callback returns true search the next page.
    if (eachCb(res.data) === true) {
      if (res.paging.next) {
        $.ajax({
          method: 'get',
          url: res.paging.next
        }).success(handler);
      } else {
        setTimeout(function () {
          eachCb(null);
        }, 0);
      }
    }
  };

  first.success(handler);
};

Facebook.prototype.searchGroupForUser = function (groupId, userId, cb) {
  var hasFoundUser = false;

  this.queryPaginated(Constants.groupId + '/members', 'get', function (users) {
    if (users !== null) {
      users.forEach(function (user) {
        if (user.id === userId) {
          hasFoundUser = true;
          cb(true);
        }
      });
      if (!hasFoundUser) {
        return true;
      }
    } else {
      // got to end of paging
      cb(false);
    }

    return false;
  });
};

Facebook.prototype.getProfilePicture = function (userId) {
  var hasFoundUser = false; 

  this.queryPaginated(userId + '/picture', 'get', function (response) {
    if (response != null && !response.error) {
      
    }
    return false;
  });
};

Facebook.prototype.getUserData = function() {
  return this.query('me');
};
