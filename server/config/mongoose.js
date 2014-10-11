var mongoose = require('mongoose'),
  categoryModel = require('../models/category');

module.exports = function(config) {

  var portname=config.db || "mongodb://localhost:27017/hackathon";
  console.log(portname);
  mongoose.connect(portname);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('hackathon db opened for ' + config.name + 
    	' on port ' + portname);
  });
  categoryModel.createDefaultCategory();
};