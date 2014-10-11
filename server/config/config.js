var path = require('path');

console.log(path.normalize(__dirname + '/../../'));
module.exports = {
  development: {
    name: 'localhost',
    db: 'mongodb://localhost/hackathon',
    rootPath: path.normalize(__dirname + '/../../'),
    port: process.env.PORT || 3000
  }
/*  , production: {
    name: 'heroku',
    db: 'mongodb://heroku_app27660518:87rbfojvie5quidg02m374ula7@ds027479.mongolab.com:27479/heroku_app27660518',
    rootPath: path.normalize(__dirname + '/../../'),
    port: process.env.PORT || 3000
  }*/
}