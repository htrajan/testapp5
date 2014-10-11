var mongoose = require('mongoose');
var Category = mongoose.model('Category');


exports.getCategories = function(req, res) {
  Category.find({}).exec(function(err, categories) {
    res.send(categories);
  });
};