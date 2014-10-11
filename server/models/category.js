var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, require: true}
});

var Category = mongoose.model('Category', CategorySchema);



function createDefaultCategory() {
  Category.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      function onSave(err, city) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Created ' + Category.name); 
      }

      var fs = require('fs'),
          readline = require('readline'),
          file = __dirname + '/../../categoryDefault.json';
      var rd = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
      });

      rd.on('line', function(line) {
        line = JSON.parse(line);
        Category.create(line);
      });
    }
  });
}

exports.createDefaultCategory = createDefaultCategory;