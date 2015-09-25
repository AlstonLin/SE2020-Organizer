if (Meteor.isClient) {
  var renderer = new marked.Renderer();
  renderer.table = function (header, body) {
    return '<table class="table">'
      + '<thead>' + header + '</thead>' +
        '<tbody>' + body + '</tbody>' +
    '</table>';
  };

  marked.setOptions({
    renderer: renderer,
    highlight: function (code) { return hljs.highlightAuto(code).value; }
  });

  Template.registerHelper('formatMedDate', function (date) {
    var m = moment(date);
    return m.format('MMM D h:mm A');
  });
}

if (Meteor.isServer) {

}
