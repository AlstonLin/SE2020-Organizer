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

Facebook.prototype.getUserData = function() {
  return this.query('me');
};
