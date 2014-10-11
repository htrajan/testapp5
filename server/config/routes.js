var categoryService = require('../services/category');

module.exports = function(app) {

  app.get('/category', categoryService.getCategories);
  
};