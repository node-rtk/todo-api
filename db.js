/**
 * Created by r.pek on 4/11/2018.
 */
var Sequelize = require('sequelize');
var sequelize= new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname+'/data/basic-sqlite-database.sqlite'
});

var db = {};
//import model
db.todo=sequelize.import(__dirname+'/models/todo.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;

//when we use with object
// we can return many things
module.exports =db;