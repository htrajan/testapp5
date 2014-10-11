var express = require('express');

module.exports = function(app, config) {
	app.use('/lib', express.static(config.rootPath + '/lib'));
  app.use(express.static(config.rootPath + '/public'));
  app.use(require('morgan')('dev'));
  app.use(require('body-parser')());
  app.use(require('cookie-parser')());
  app.use(require('method-override')());
  app.use(require('cookie-session')({secret: 'hackathon top secret'}));
  app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));
}