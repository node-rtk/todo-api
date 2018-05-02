

/**
 * Created by r.pek on 4/11/2018.
 */
var Sequelize = require('sequelize');
var env =process.env.NODE_ENV || 'development';
var sequelize;

if( env=== 'production' ){
        sequelize= new Sequelize(process.env.DATABASE_URL, {
                dialect : 'postgres'
            });
}else{   
        sequelize= new Sequelize(undefined, undefined, undefined, {
                'dialect': 'sqlite',
                'storage': __dirname+'/data/basic-sqlite-database.sqlite'
            });
}




var db = {};
//import model
db.todo=sequelize.import(__dirname+'/models/todo.js');
db.user=sequelize.import(__dirname+'/models/user.js');
//db.user = sequelize.import(__dirname+'/models/user.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;

//when we use with object
// we can return many things
module.exports =db;