var tools = require('../../tools');

module.exports = function(req, res) {

  // console.log(req.body);

  var m = {
    to: ['brody@ionic.io'],
    from: 'sales@ionic.io',
    name: 'Ionic.io',
    subject: 'Ionic Pricing Enterprise Sub. Entry',
    body: objToString(req.body)
  };

  if (req.body.form === 'beta') {
    m.name = 'Ionic Pricing Feedback';
  }

  tools.email(m.to, m.from, m.name, m.subject, m.body).then(function() {
    res.locals.notification = 'Message Sent';
    res.locals.notificationClass = 'white';
    console.log('pricing email sent');
    res.render('pricing/index');
  }, function(err) {
    res.locals.notification = 'Unable to send message at this time';
    res.locals.notificationClass = 'error';
    res.render('pricing/index');
  });
};

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += cap(p) + ' :: ' + obj[p] + '\n\r';
    }
  }
  return str;
};

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
